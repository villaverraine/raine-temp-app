import express from 'express';
import User from '../models/Users.js';
import Events from '../models/Events.js';
import Guest from '../models/Guests.js';

const router = express.Router();

router.get('/status', async (req, res) => {
    res.json({ status: 'Server is up and running.' });
});

export default router;