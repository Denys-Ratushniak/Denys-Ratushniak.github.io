import React from 'react';
import { useState } from 'react';
import '../sass/edit-user.scss';
import axios from 'axios';

export default function EditUser() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async event => {
        event.preventDefault();
        const data = Object.fromEntries(Object.entries(formData).filter(([, v]) => v !== ''));
        if (data.password && data.password !== data.confirmPassword) {
            alert('Passwords do not match');
        } else {
            if (data.confirmPassword) delete data.confirmPassword;
            
            const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
            }
            };
            try{
                const response = await axios.put('http://127.0.0.1:5000/user/self', data, config);
                alert('User successfully updated');
                window.location.href = './account';
            } catch (error){
                alert(error.response.data.error);
            }
        }
    };

    return (
        <main className="user-edit-container">
            <section className="user-edit-section">
                <div className="user-edit-dialog">
                <p className="user-edit-general">Edit User</p>
                <form className="user-edit-form">
                    <label className="input-label">First Name</label>
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    minLength="3"
                    maxLength="20"
                    pattern="[A-Za-z]+"
                    title="firstName must be between 3 and 20 characters and contain only letters."
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <label className="input-label">Last Name</label>
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    minLength="3"
                    maxLength="20"
                    pattern="[A-Za-z]+"
                    title="lastName must be between 3 and 20 characters and contain only letters."
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <label className="input-label">Email</label>
                    <input
                    type="email"
                    id="email"
                    name="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Please enter a valid email address."
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <label className="input-label">Password</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    minLength="8"
                    title="password must contain at least 8 characters"
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <label className="input-label"
                    >Confirm Password</label
                    >
                    <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    minLength="8"
                    title="confirm password must contain at least 8 characters"
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <label className="input-label">Phone</label>
                    <input
                    type="tel"
                    id="phone"
                    name="phone"
                    pattern="^[0-9]{10}$"
                    className="input-field"
                    onChange={handleInputChange}
                    />

                    <button type="submit" className="user-edit-button" onClick={handleSubmit}>Edit User</button>
                </form>
                </div>
            </section>
        </main>
    )
}
