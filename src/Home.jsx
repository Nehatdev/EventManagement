import React from 'react';
import himg from './wimg2.webp';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className='home_container' style={{ backgroundImage: `url(${himg})` }}>
        <div className='content'>
          <Link to='login'>
            <button type="button" className='fbtn'>Login</button>
          </Link>
          <h1 className='main'>ORGANIZE AND ENJOY UNFORGETTABLE EVENTS</h1>
          <h2 className='sub'>Your One-Stop Solution for Event Management</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
