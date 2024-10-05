import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

export const EventDelete = () => {
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [event, setEvent] = useState({});

    const fetchData = async () => {
        try {
            const eventResponse = await axios.get(`http://localhost:5000/events/${id}`); // Full URL
            setEvent(eventResponse.data);
        } catch (error) {
            console.error('Error', error);
        }
    };
    
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/events/${id}`);
            navigate('/adminpage/eventhandle'); 
        } catch (error) {
            console.error('Error', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    return (
        <section className="event-delete-container">
            <div className="delete container">
                <h1>{event.name}</h1> 
                <img src={`http://localhost:5000/uploads/eventImages/${event.image}`} alt={event.name} /> 
                <div className="content">{event.description}</div> 
                <button onClick={handleDelete}>Delete</button> 
            </div>
        </section>
    );
};

export default EventDelete;
