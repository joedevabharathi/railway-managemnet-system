import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [trains, setTrains] = useState([]);
    const [newTrain, setNewTrain] = useState({
        name: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        seats: 0,
    });

    const fetchTrains = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/trains');
            setTrains(data);
        } catch (error) {
            console.error('Error fetching trains:', error);
        }
    };

    const handleAddTrain = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/admin/add-train', newTrain);
            alert('Train added successfully');
            fetchTrains();
            setNewTrain({ name: '', source: '', destination: '', departureTime: '', arrivalTime: '', seats: 0 });
        } catch (error) {
            console.error('Error adding train:', error);
        }
    };

    useEffect(() => {
        fetchTrains();
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Admin Dashboard</h2>
            <form onSubmit={handleAddTrain} className="mb-4">
                <h4>Add New Train</h4>
                <div className="mb-3">
                    <label className="form-label">Train Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newTrain.name}
                        onChange={(e) => setNewTrain({ ...newTrain, name: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Source</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newTrain.source}
                        onChange={(e) => setNewTrain({ ...newTrain, source: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Destination</label>
                    <input
                        type="text"
                        className="form-control"
                        value={newTrain.destination}
                        onChange={(e) => setNewTrain({ ...newTrain, destination: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Departure Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={newTrain.departureTime}
                        onChange={(e) => setNewTrain({ ...newTrain, departureTime: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Arrival Time</label>
                    <input
                        type="time"
                        className="form-control"
                        value={newTrain.arrivalTime}
                        onChange={(e) => setNewTrain({ ...newTrain, arrivalTime: e.target.value })}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Seats</label>
                    <input
                        type="number"
                        className="form-control"
                        value={newTrain.seats}
                        onChange={(e) => setNewTrain({ ...newTrain, seats: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">Add Train</button>
            </form>

            <h4>All Trains</h4>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Departure</th>
                        <th>Arrival</th>
                        <th>Seats</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((train) => (
                        <tr key={train._id}>
                            <td>{train.name}</td>
                            <td>{train.source}</td>
                            <td>{train.destination}</td>
                            <td>{train.departureTime}</td>
                            <td>{train.arrivalTime}</td>
                            <td>{train.seats}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
