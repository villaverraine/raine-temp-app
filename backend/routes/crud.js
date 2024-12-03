import express from 'express';
import mongoose from 'mongoose';
import authenticateToken from '../middleware/authenticateToken.js';
import User from '../models/Users.js';
import Events from '../models/Events.js';
import Guest from '../models/Guests.js';

const router = express.Router();

router.post('/create/:model', authenticateToken, async (req, res) => {
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

router.post('/delete/:model/:id', authenticateToken, async (req, res) => {
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

router.post('/update/:model/:id', authenticateToken, async (req, res) => {
    const { model, id } = req.params;

    try {
        if (!mongoose.models[model]) {
            return res.status(404).json({ success: false, message: `Model "${model}" not found` });
        }

        const Model = mongoose.model(model);

        const updateData = req.body;

        if (!updateData || typeof updateData !== 'object' || Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: "No valid data provided for update." });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ID format." });
        }

        const response = await Model.findByIdAndUpdate(id, updateData, { new: true });

        if (!response) {
            return res.status(404).json({ success: false, message: "Document not found or already deleted." });
        }

        res.status(200).json({ success: true, message: "Successfuly Updated", data: response });
    } catch (error) {
        console.error("Delete Failed.", error);
        res.status(500).json({ success: false, message: "Update Failed.", error });
    }
});

router.get

export default router;