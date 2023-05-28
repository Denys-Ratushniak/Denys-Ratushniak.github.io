import React from "react";
import { useState, useEffect } from "react";
import "../sass/account.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import Cookies from 'js-cookie'

export default function Account() {
    const navigate = useNavigate();
    const [accountData, setAccountData] = useState({});
    const [orders, setOrders] = useState([]);

    const handleGetInfo = async (event) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };

        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/user/self",
                config
            );
            setAccountData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleGetOrders = async (event) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };
        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/booking/ordersby/me",
                config
            );
            response.data = response.data.slice(0, -1);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetInfo();
        handleGetOrders();
        const message = Cookies.get('message');
        console.log(message);
        if (message) {
            Message(message, 'success');
            Cookies.remove('message');
        }
    }, []);

    const handleSignOut = async (event) => {
        sessionStorage.removeItem("Authorization");
        Message("You successfully signed out", "success");
        navigate("../home");
    };

    const handleDelete = async (event) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };
        try {
            const response = await axios.delete(
                "http://127.0.0.1:5000/user/self",
                config
            );
            
            sessionStorage.removeItem("Authorization");
            Message("User successfully deleted", "success");
            navigate("../home");
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteOrder = async (orderId) => {
        const config = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                Authorization: sessionStorage.getItem("Authorization"),
            },
        };

        try {
            var link = `http://127.0.0.1:5000/booking/order/${orderId}`;
            const response = await axios.delete(link, config);
            Cookies.set("message", "Selected order was successfully deleted");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <main className="account-container">
                <section className="user-section">
                    <div className="user-info">
                        <div className="username">
                            Username: {accountData.username}
                        </div>
                        <div className="main-info">
                            <p className="user-details">
                                First Name: {accountData.firstName}
                            </p>
                            <p className="user-details">
                                Last Name: {accountData.lastName}
                            </p>
                            <p className="user-details">
                                Email: {accountData.email}
                            </p>
                            <p className="user-details">
                                Phone: {accountData.phone}
                            </p>
                            <p className="user-details">
                                Birth Date: {accountData.birthDate}
                            </p>
                        </div>
                        <div className="user-actions">
                            <Link to="/edit-user" className="edit-user-link">
                                Edit Account
                            </Link>
                            <button className="delete-user" onClick={handleDelete}>
                                Delete User
                            </button>
                            <button className="sign-out" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                        <div className="tip">Scroll down to see your orders</div>
                    </div>
                </section>

                <section className="orders-section">
                    <div className="orders">
                        <p className="orders-heading">Your Orders</p>
                        {orders.length === 0 && (
                            <p className="orders-heading">You have no orders</p>
                        )}
                        <div className="grid-container">
                            {orders.map((order, index) => (
                                <div key={index} className="order">
                                    <div className="order-details">
                                        <p className="classroom-name-account">
                                            Classroom Name: {order.classroom_name}
                                        </p>
                                        <p className="capacity">
                                            Capacity: {order.classroom_capacity}
                                        </p>
                                        <p className="time">
                                            Start Time: {order.start_time}
                                        </p>
                                        <p className="time">
                                            End Time: {order.end_time}
                                        </p>
                                    </div>
                                    <button
                                        className="cancel-order-button"
                                        role="cancel-order-button"
                                        onClick={() =>
                                            handleDeleteOrder(order.id)
                                        }
                                    >
                                        Cancel Order
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
