import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { toast } from 'react-toastify';

const EventForm = () => {
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    organizer: '',
    user: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(eventData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append('image', image);
    console.log('Form data being sent:');
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post('http://localhost:5000/addevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Event added successfully');
      console.log('Event added successfully:', response.data);
      setEventData({
        name: '',
        description: '',
        category: '',
        date: '',
        time: '',
        location: '',
        maxAttendees: '',
        organizer: '',
        user: '',
      });
      setImage(null);
    } catch (error) {
      console.error('Error', error);
      toast.error('Failed');
    }
  };

  return (
    <div className="create">
      <h2>Create Your Event</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(eventData).map((key) => (
          <div className="input-box" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            {key === 'description' ? (
              <textarea
                name={key}
                placeholder={`Event ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                value={eventData[key]}
                onChange={handleChange}
                required
              />
            ) : (
              <input
                type={key === 'maxAttendees' ? 'number' : key === 'date' ? 'date' : key === 'time' ? 'time' : 'text'}
                name={key}
                placeholder={`Event ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                value={eventData[key]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}
        <div className="input-box">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            required
          />
        </div>
        
          <button className="button" type="submit">Add Event</button>
    
      </form>
    </div>
  );
};

export default EventForm;