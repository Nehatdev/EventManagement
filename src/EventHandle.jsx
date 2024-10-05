import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './App.css';

const EventHandle = () => {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = async () => {
    try {
      let response = await axios.get('http://localhost:5000/events');
      console.log(response.data);
      
      setEvents(response.data);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section style={{ marginTop: '150px' }} className='events-container'>
      <input
        type="text"
        placeholder="Search Events..."
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className='events'>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item) => (
            <div key={item._id} className='card-container'>
              <Card className='card' onClick={() => { navigate(`/adminpage/eventdelete/${item._id}`); }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/uploads/eventImages/${item.image}`}
                  alt="event"
                  width={'200px'}
                  height={'200px'}
                />
                <Card.Body className="event-details">
                  <Card.Title className='card-title'>
                    <h2>{item.name}</h2>
                  </Card.Title>
                  <div className='card-content'>
                    <div>{item.category}</div>
                    <div>{item.location}</div>
                    <div>{item.date}</div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Events Found</div>
        )}
      </div>
    </section>
  );
}

export default EventHandle;