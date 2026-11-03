const express = require('express');
const Train = require('../models/Train');

const router = express.Router();

router.post('/add-train', async (req, res) => {
    try {
        const train = new Train(req.body);
        await train.save();
        res.status(201).json({ message: 'Train added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/trains', async (req, res) => {
    try {
        const trains = await Train.find();
        res.json(trains);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
