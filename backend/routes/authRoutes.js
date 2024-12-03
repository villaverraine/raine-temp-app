import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";
import Event from "../models/Events.js";
import moment from "moment-timezone";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

// Register Endpoint
router.post("/register", async (req, res) => {
  const { firstName, lastName, username, email, password, contactNumber } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name: { first: firstName, last: lastName },
      username,
      password: hashedPassword,
      email,
      contactNumber,
    });

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
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Registration failed", error });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, username: user.username }, jwtSecret, { expiresIn: "1h" });

    res.json({
      success: true,
      message: "Login successful",
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
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login failed", error });
  }
});

// Get All Users
router.get("/getAllUser", async (req, res) => {
  try {
    const userList = await User.find();
    if (userList.length === 0) {
      return res.status(404).json({ success: false, message: "No users found" });
    }

    res.json({
      success: true,
      message: "Found users",
      users: userList.map((user) => ({
        id: user._id,
        username: user.username,
        name: user.name,
      })),
    });
  } catch (error) {
    console.error("Get All Users error:", error);
    res.status(500).json({ success: false, message: "Error fetching users", error });
  }
});

// Get User by Username
router.get("/getUser", async (req, res) => {
  const { username } = req.query;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ success: false, message: "Cannot find user" });
    }

    res.json({
      success: true,
      message: "Found user",
      user: { id: user._id, username: user.username, name: user.name },
    });
  } catch (error) {
    console.error("Find User error:", error);
    res.status(500).json({ success: false, message: "Cannot find user", error });
  }
});

// Create Event Endpoint
router.post("/events", async (req, res) => {
  const { name, date, venue, category, description } = req.body;

  try {
    const existingEvent = await Event.findOne({ name, date, venue });
    if (existingEvent) {
      return res.status(400).json({ success: false, message: "Event already exists." });
    }

    const newEvent = await Event.create({
      name,
      date,
      venue,
      category,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Successfully created event. Redirecting...",
      event: {
        _id: newEvent._id,
        name: newEvent.name,
        date: newEvent.date,
        venue: newEvent.venue,
        category: newEvent.category,
        description: newEvent.description,
      },
    });
  } catch (error) {
    console.error("Event Creation error:", error);
    res.status(500).json({ success: false, message: "Event Creation failed", error });
  }
});

export default router;