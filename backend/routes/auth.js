import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/Users.js';
import Events from '../models/Events.js';

const router = express.Router();
const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET;

//Registration Endpoint
router.post('/register', async (req, res) => {
    const { firstName, lastName, username, email, password, contactNumber } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Username or email already exists.' });
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
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed', error });
    }
});

router.post('/login', async (req, res) => {
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

export default router;