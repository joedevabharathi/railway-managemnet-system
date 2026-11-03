const express = require('express');
const Booking = require('../models/Booking');
const Train = require('../models/Train');

const router = express.Router();

router.post('/book', async (req, res) => {
    const { userId, trainId, seatsBooked } = req.body;
    try {
        const train = await Train.findById(trainId);
        if (train.seats < seatsBooked) throw new Error('Not enough seats available');
        train.seats -= seatsBooked;
        await train.save();

        const booking = new Booking({ userId, trainId, seatsBooked });
        await booking.save();
        res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.params.userId }).populate('trainId');
        res.json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
