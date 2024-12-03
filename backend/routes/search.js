import express from 'express';
import mongoose from 'mongoose';
import authenticateToken from '../middleware/authenticateToken.js';
import User from '../models/Users.js';
import Events from '../models/Events.js';
import Guest from '../models/Guests.js';

const router = express.Router();

router.post('/:model', authenticateToken, async (req, res) => {
    const { model } = req.params;
    try {
        if (!mongoose.models[model]) {
            return res.status(404).json({ success: false, message: `Model "${model}" not found` });
        }
        const Model = mongoose.model(model);
        const response = await Model.find(req.body).exec();
        if (!response.length) {
            return res.status(404).json({ message: "No results found." });
        }
        res.json({ success: true, message: "Search Successful!", result: response });
    } catch (error) {
        console.error("Search Error:", error);
        res.status(500).json({ success: false, message: "Search Failed." });
    }
});

router.post('/userDashboard/:model/', authenticateToken, async (req, res) => {
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

export default router;