const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    seats: { type: Number, required: true },
});

module.exports = mongoose.model('Train', trainSchema);
