import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

 const Customer = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/users')
        .then(response => {
            console.log('Users', response.data); 
            setUsers(response.data);
        })
        .catch(error => {
            console.error('Error', error.response);
        });
    
    }, []);

    return (
        <div>
            <div className="admin-page-container">
                <div className="section">
                    <h3>User Details</h3>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(users => (
                                <tr key={users._id}>
                                    <td>{users.name}</td>
                                    <td>{users.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Customer;