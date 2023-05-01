import React from 'react';
import { useState } from 'react';
import '../sass/login.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const username = formData.username;
        const password = formData.password;
        const credentials = `${username}:${password}`;
        const encodedCredentials = btoa(credentials);

        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: `Basic ${encodedCredentials}`
            }
        };

        

        try {
            const response = await axios.get('http://127.0.0.1:5000/user_login', config);
            sessionStorage.setItem('Authorization', `Basic ${encodedCredentials}`);
            alert('You successfully signed in');
            window.location.href = './account';
        } catch (error) {
            alert('Invalid username or password');
        }
    }

    return (
        <main className="login-container">
            <section className="login-section">
                <div className="login-form">
                <form id="login-form">
                <h2 className="form-title">Login</h2>
                <div className="form-group">
                    <label className="input-label">Username *</label>
                    <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    minLength="3"
                    maxLength="20"
                    pattern="[A-Za-z0-9]+"
                    title="Username must be between 3 and 20 characters and contain only letters and numbers."
                    className="input-field"
                    onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label className="input-label">Password *</label>
                    <input
                    type="password"
                    id="password"
                    name="password"
                    className="input-field"
                    required
                    onChange={handleInputChange}
                    />
                </div>
                
                </form>
                <button type="submit" className="login-button" id="login-button" onClick={handleSubmit}>Login</button>
                <div className="register-forgotpassword-links">
                    <Link to='/create-user' className="register-link">Do not have an account? Create it here!</Link>
                    <Link to='/forgot-password' className="forgotpaswword-link">Forgot password</Link>
                </div>
            </div>
            
                
            </section>
        </main>
    )
}
