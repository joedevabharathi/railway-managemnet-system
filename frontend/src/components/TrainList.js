import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrainList = ({ onSelectTrain }) => {
    const [trains, setTrains] = useState([]);

    const fetchTrains = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/admin/trains');
            setTrains(data);
        } catch (error) {
            console.error('Error fetching trains:', error);
        }
    };

    useEffect(() => {
        fetchTrains();
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">Train List</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Source</th>
                        <th>Destination</th>
                        <th>Seats</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {trains.map((train) => (
                        <tr key={train._id}>
                            <td>{train.name}</td>
                            <td>{train.source}</td>
                            <td>{train.destination}</td>
                            <td>{train.seats}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => onSelectTrain(train)}>
                                    Book
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TrainList;
