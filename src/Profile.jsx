import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: null,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  console.log('Retrieved User ID:',id);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (!id || !token) {
      setError('. Please login again.');
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/findOne/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        
        setFormData({
          name: response.data.name,
          email: response.data.email,
          password: '', 
          profileImage: null,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data. Please try again.');
      }
    };

    fetchData();
  }, [id, token, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'profileImage' ? files[0] : value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return false;
    }
    return true;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    if (formData.profileImage) {
      formDataToSend.append('profileImage', formData.profileImage);
    }

    try {
      const response = await axios.put(`http://localhost:5000/update/${id}`, formDataToSend, {
        headers: {
          Authorization: token,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Profile updated successfully');
      } else {
        setError('Profile update failed.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('An error occurred while updating the profile. Please try again.');
    }
  };

  return (
    <>
      <section className='d-flex justify-content-center align-items-center' style={{ marginTop: '120px' }}>
        <div className='container'>
          <div className='profile'>
            <div className=''>
              <div className='editpro'>
                <form onSubmit={handleUpdate} encType="multipart/form-data">
                  <h1 style={{ textAlign: 'center' }}>{formData.name}</h1>
                  {error && <p className="error">{error}</p>}
                  {success && <p className="success">{success}</p>}
                  <div className="proform-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder='Name' />
                  </div>
                  <div className="proform-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder='Email' />
                  </div>
                  <div className="proform-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" onChange={handleChange} placeholder="Change Password" />
                  </div>
                  <div className="proform-group">
                    <label htmlFor="profileImage">Profile</label>
                    <input type="file" name="profileImage" accept="image/*" onChange={handleChange} />
                  </div>
                  <button className='probutton' type="submit">Update Profile</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
export default Profile;