import React from 'react'
import { useState, useEffect } from 'react';
import '../sass/account.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Account() {
    const [accountData, setAccountData] = useState({});
    const handleGetInfo = async () => {
            const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
            },
            };
        
            try {
            const response = await axios.get(
                'http://127.0.0.1:5000/user/self',
                config
            );
            setAccountData(response.data);
            } catch (error) {
            console.log(error);
            }
      };

    const handleSignOut = async event => {
        event.preventDefault();
        sessionStorage.removeItem('Authorization');
        alert("Seccessfully signed out");
        window.location.href = './home';
    }
    useEffect(() => {
        handleGetInfo();
      }, []);
    
    const handleDelete = async event => {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                Authorization: sessionStorage.getItem('Authorization'),
            },
            };
        try {
            const response = await axios.delete('http://127.0.0.1:5000/user/self', config);
            alert('User successfully deleted');
            sessionStorage.removeItem('Authorization');
            window.location.href = './home';
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <main className="account-container">
            <section className="user-section">
                <div className="user-info">
                    <div className="username">Username: {accountData.username}</div>
                    <div className="main-info">
                        <p className="user-details">First Name: {accountData.firstName}</p>
                        <p className="user-details">Last Name: {accountData.lastName}</p>
                        <p className="user-details">Email: {accountData.email}</p>
                        <p className="user-details">Phone: {accountData.phone}</p>
                        <p className="user-details">Birth Date: {accountData.birthDate}</p>
                    </div>
                    <div className="user-actions">
                        <Link to="/edit-user" className="edit-user-link">Edit Account</Link>
                        <button className="delete-user" onClick={handleDelete}>Delete User</button>
                        <button className="sign-out" onClick={handleSignOut}>Sign Out</button>
                    </div>
                    <div className="tip">Scroll down to see your orders</div>
                </div>
            </section>

            <section className="orders-section">
                <div className="orders">
                    <p className="orders-heading">Your Orders</p>
                    <div className="grid-container">
                        <div className="order">
                            <div className="order-details">
                                <p className="classroom-name">Classroom Name: 101</p>
                                <p className="capacity">Capacity: 27</p>
                                <p className="time">Start Time: 2023-04-01 10:00:00</p>
                                <p className="time">End Time: 2023-04-01 15:00:00</p>
                            </div>
                            <button className="cancel-order-button">Cancel Order</button>
                        </div>

                        <div className="order">
                            <div className="order-details">
                                <p className="classroom-name">Classroom Name: 102</p>
                                <p className="capacity">Capacity: 28</p>
                                <p className="time">Start Time: 2023-04-01 10:00:00</p>
                                <p className="time">End Time: 2023-04-01 15:00:00</p>
                            </div>
                            <button className="cancel-order-button">Cancel Order</button>
                        </div>

                        <div className="order">
                            <div className="order-details">
                                <p className="classroom-name">Classroom Name: 103</p>
                                <p className="capacity">Capacity: 29</p>
                                <p className="time">Start Time: 2023-04-01 10:00:00</p>
                                <p className="time">End Time: 2023-04-01 15:00:00</p>
                            </div>
                            <button className="cancel-order-button">Cancel Order</button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
