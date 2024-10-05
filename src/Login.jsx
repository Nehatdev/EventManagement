import React, { useState } from 'react';
import './App.css'; 
import {NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';

export const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    if (formData.email === 'admin@gmail.com' && formData.password === 'admin') {
      window.alert('Admin Login Success');
      localStorage.setItem('id', 'adminId');
      localStorage.setItem('userType', 'admin');
      navigate('/adminpage');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);

      if (response.data.success) {
        localStorage.setItem('id', response.data.user.id);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        if (response.data.user.role === 'admin') {
          navigate('/adminpage');
        } else if (response.data.user.role === 'user') {
          navigate('/customerpage');
        }
        console.log('Login successful');;

      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='login'>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="input-box">
            <input
              type="email"
              className='form-control'
              onChange={handleChange}
              name="email"
              placeholder='Email'
              value={formData.email}
              required
              disabled={loading} 
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              className='form-control'
              onChange={handleChange}
              name="password"
              placeholder='Password'
              value={formData.password}
              required
              disabled={loading}
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <NavLink to="/register" className='login-link'>Not yet registered? Register Now</NavLink>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
