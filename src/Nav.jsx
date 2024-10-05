import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './App.css';

const Nav = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <div className='nav'>
        <div className='head'>
          <h1>Events</h1>
        </div>

        <div className='list'>
          <Link to='/'>Home</Link>
          <Link to='/about'>AboutUs</Link>
          <Link to='/events'>Events</Link>
          {!user.name ? (
            <>
              <Link to='/login'>Login</Link>
              <Link to='/register'>SignUp</Link>
            </>
          ) : (
            <>
              <button className='btn' onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Nav;
