import 'dotenv/config';
import mongoose, { mongo } from 'mongoose';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;
const uri = process.env.URI;
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

const jwtSecret = process.env.JWT_SECRET;

import User from './models/Users.js';
import Events from './models/Events.js';

async function main() {
  console.log(process.env.URI);
  console.log(process.env.PORT);
  const port = process.env.PORT;
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Connect the server to the database
  try {
    await mongoose.connect(uri, { dbName: "AWSTicketApp" }, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");
  } catch (error) {
    await mongoose.disconnect();
    console.error('Failed to connect to DB:', error);
  }

  function authenticateToken(req, res, next) {
    const token = req.headers['authorization']

    if (!token) {
      return res.status(401).json({ message: "Token is missing." });
    }

    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Verification Failed." })
      }
      req.user = user;
      next();
    })
  }

  // ----------------|| API Calls ||----------------
  // REGISTER a user account to the database
  app.post('/api/register', async (req, res) => {
    const { firstName, lastName, username, email, password, contactNumber } = req.body;

    try {
      // Check if the email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists.',
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create new user
      const newUser = await User.create({
        name: {
          first: firstName,
          last: lastName,
        },
        username: username,
        password: hashedPassword,
        email: email,
        contactNumber: contactNumber,
      });

      // Respond with success message and limited user data (excluding password)
      res.status(201).json({
        success: true,
        message: "Successfully registered. Redirecting...",
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          name: newUser.name,
          contactNumber: newUser.contactNumber,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ success: false, message: 'Registration failed', error });
    }
  });

  // LOGIN a user
  app.post('/api/login', async (req, res) => {
    const { identifier, password } = req.body;

    try {
      const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: '1h' });

      res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          contactNumber: user.contactNumber,
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Login failed', error });
    }
  });

  app.post('/api/search/:model/', authenticateToken, async (req, res) => {
    const { model } = req.params

    try {
      if (!mongoose.models[model]) {
        return res.status(404).json({ success: false, message: `Model "${model}" not found` });
      }

      const Model = mongoose.model(model);

      const response = await Model.find(req.body).exec();

      if (!response.length) {
        return res.status(404).json({ message: "No results found." });
      }

      console.log(response);
      res.json({ success: true, message: "Search Successful!", result: response });

    } catch (error) {
      console.error("Search Error:", error)
      return res.status(500).json({ success: false, message: "Search Failed." });
    }
  }); 

  app.post('/api/search/userDashboard/:model/', authenticateToken, async (req, res) => {
    const { model } = req.params;
    const { userId } = req.body; // Extract userId from the request body

    try {
        // Check if the model exists in mongoose
        if (!mongoose.models[model]) {
            return res.status(404).json({ success: false, message: `Model "${model}" not found` });
        }

        const Model = mongoose.model(model);

        // Search for documents where the userId exists in either moderators or registrationStaff
        const response = await Model.find({
            $or: [ 
                { moderators: userId },
                { registrationStaff: userId },
                { admin: userId }
            ]
        }).exec();

        if (!response.length) {
            return res.status(404).json({ message: "No results found." });
        }

        console.log(response);
        res.json({ success: true, message: "Search Successful!", result: response });

    } catch (error) {
        console.error("Search Error:", error);
        return res.status(500).json({ success: false, message: "Search Failed.", error });
    }
});

  app.post('/api/create/:model/', authenticateToken, async (req, res) => {
    const { model } = req.params
    console.log("Available models:", mongoose.models);
    try {
      if (!mongoose.models[model]) {
        return res.status(404).json({ success: false, message: `Model "${model}" not found` });
      }

      const Model = mongoose.model(model);

      const dataToInsert = req.body;

      if (!dataToInsert || typeof dataToInsert !== 'object') {
        res.status(400).json({ success: false, message: 'Data to be inserted not type of object.' });
      }

      const response = await Model.create(dataToInsert);

      console.log(response);
      res.status(201).json({ message: true, message: "Data Created Successfully!", data: response });

    } catch (error) {
      console.error("Create Error", error);
      res.status(500).json({ success: false, message: "Create Failed." });
    }
  });

  app.post('/api/delete/:model/:id', authenticateToken, async (req, res) => {
    const { model, id } = req.params;
    console.log(model);
    try {
      if (!mongoose.models[model]) {
        return res.status(404).json({ success: false, message: `Model "${model}" not found` });
      }

      const Model = mongoose.model(model);

      const response = await Model.deleteOne({ _id: id });
      if (!response.deletedCount == 0) {
        return res.status(400).json({ success: false, message: "Data Failed to be Deleted." });
      }

      return res.json({ success: true, message: "Data Deleted Successfully." });
    } catch (error) {
      console.error("Delete Failed.", error);
      return res.status(500).json({ success: false, message: "Delete Failed.", error });
    }
  });

  app.post('/api/update/:model/:id', authenticateToken, async (req, res) => {
    const { model, id } = req.params;

    try {
      if (!mongoose.models[model]) {
        return res.status(404).json({ success: false, message: `Model "${model}" not found` });
      }

      const Model = mongoose.model(model);
      
      const updateData = req.body;

      if(!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
        return res.status(400).json({ success: false, message: "No valid data provided for update."});
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid ID format." });
    }

      const response = await Model.findByIdAndUpdate(id, updateData, {new: true});

      if(!response) {
        return res.status(404).json({ success: false, message: "Document not found or already deleted."});
      }

      res.status(200).json({ success: true, message: "Successfuly Updated", data: response});
    } catch (error) {
      console.error("Delete Failed.", error);
      res.status(500).json({ success: false, message: "Update Failed.", error });
    }
  });

  // Health check endpoint
  app.get('/api/status', async (req, res) => {
    res.json({ status: 'Server is up and running.' });
  });

  // Start the server
  app.listen(port, () => {
    console.log(`Server is running on Port: ${port}`);
  });
}

main();
