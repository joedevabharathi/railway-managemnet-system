import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch the bookings data from the backend
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/bookings`)
            .then(response => {
                setBookings(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching bookings');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2>Booking List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Booking ID</th>
                        <th scope="col">Passenger Name</th>
                        <th scope="col">Train Name</th>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(booking => (
                        <tr key={booking._id}>
                            <td>{booking.bookingId}</td>
                            <td>{booking.passengerName}</td>
                            <td>{booking.trainName}</td>
                            <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                            <td>{booking.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;
