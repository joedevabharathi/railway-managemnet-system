import React, { useState, useEffect } from 'react';
import TrainList from './TrainList';
import axios from 'axios';

const UserDashboard = () => {
    const [selectedTrain, setSelectedTrain] = useState(null);
    const [seats, setSeats] = useState(1);

    const handleBooking = async () => {
        try {
            const userId = localStorage.getItem('userId'); // Replace with actual logged-in user ID
            const { data } = await axios.post('http://localhost:5000/api/bookings/book', {
                userId,
                trainId: selectedTrain._id,
                seatsBooked: seats,
            });
            alert('Booking Successful');
            setSelectedTrain(null);
        } catch (error) {
            console.error('Error booking train:', error);
        }
    };

    return (
        <div className="container">
            {selectedTrain ? (
                <div>
                    <h2 className="my-4">Booking Train: {selectedTrain.name}</h2>
                    <div className="mb-3">
                        <label className="form-label">Seats</label>
                        <input
                            type="number"
                            className="form-control"
                            value={seats}
                            min="1"
                            max={selectedTrain.seats}
                            onChange={(e) => setSeats(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-success" onClick={handleBooking}>
                        Confirm Booking
                    </button>
                </div>
            ) : (
                <TrainList onSelectTrain={setSelectedTrain} />
            )}
        </div>
    );
};

export default UserDashboard;
