import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const EventDetails = () => {
  const { id } = useParams(); 
  const [events, setEvents] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        console.log('Fetching event with ID:', id); 
        const response = await axios.get(`http://localhost:5000/events/${id}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };
  
    fetchEventDetails();
  }, [id]);
  

  const handleRegisterNow = () => {
    navigate(`/customerpage/eventdetails/booking/${id}`);
  };

  return (
    <section className="event-details-container">
      <div className="details">
        <h1 className="event-title">{events.name}</h1>
        <div className="event-image-container">
          <img
            src={`http://localhost:5000/uploads/eventImages/${events.image}`}
            alt={events.name}
            className="event-image"
          />
        </div>
        <p className="event-description">{events.description}</p>
        <div className="event-details-info">
          <p>Category: {events.category}</p>
          <p>Location: {events.location}</p>
          <p>Date: {new Date(events.date).toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          })}</p>
          <p>Organizer: {events.organizer}</p>
          <p>Status: {events.status === 'closed' ? 'Closed' : 'Open for Registration'}</p>
        </div>
        {events.status !== 'closed' && (
          <button className="register-now-button" onClick={handleRegisterNow}>
            Register Now
          </button>
        )}
      </div>
    </section>
  );
};

export default EventDetails;
