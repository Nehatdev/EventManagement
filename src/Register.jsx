import React, { useState } from 'react';
import {NavLink ,useNavigate } from 'react-router-dom';
import './App.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    profileImage: null
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profileImage' ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords not match.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('confirmPassword', formData.confirmPassword);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formDataToSend, 
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess('Registration successful');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (error) {
      setError('Please try again.');
    }
  };

  return (
    <div className="register">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <div className='input-box'>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} />
        <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />
        <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
        <button type="submit">Register</button>
        <NavLink to="/login" className="login-link"> Already registered? Login</NavLink>
        </form>
        </div>
    </div>
  );
};

export default Register;
