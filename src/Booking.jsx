import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Booking = () => {
    const { id } = useParams(); 
    const userId = localStorage.getItem('id');
    const navigate = useNavigate();
    const [eventDetails, setEventDetails] = useState({
        name: '',
        category: '',
        organizer: ''
    });
    const [formData, setFormData] = useState({
        name: '', 
        email: '',
        phoneNumber: '',
        place: ''
    });
    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/events/${id}`);
                setEventDetails(response.data);
            } catch (error) {
                console.error('Error', error);
            }
        };
        fetchEventDetails();
    }, [id]);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/eventbookings', {
                eventId: id,
                eventName: eventDetails.name,
                name: formData.name, 
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                place: formData.place,
                user: userId
            });

            console.log('Booking successful:', response.data);
            window.alert('Booking successful!');
            navigate('/customerpage/events');
        } catch (error) {
            console.error('Error', error);
            window.alert('Booking failed. Please try again.');
        }
    };

    return (
        <div className="booking-form-container">
            <h1>Event Booking Form</h1>
            <h2>Event Details</h2>
            <p><strong>Event Name:</strong> {eventDetails.name}</p>
            <p><strong>Category:</strong> {eventDetails.category}</p>
            <p><strong>Organizer:</strong> {eventDetails.organizer}</p> 

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder='Name'
                        value={formData.name} 
                        onChange={handleFormChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder='email'
                        value={formData.email} 
                        onChange={handleFormChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Phone</label>
                    <input 
                        type="text" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        placeholder='phoneNumber'
                        value={formData.phoneNumber} 
                        onChange={handleFormChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="place">Place</label>
                    <input 
                        type="text" 
                        id="place" 
                        name="place" 
                        placeholder='place'
                        value={formData.place} 
                        onChange={handleFormChange} 
                        required 
                    />
                </div>
                <button type="submit">Book Now</button>
            </form>
        </div>
    );
};

export default Booking;