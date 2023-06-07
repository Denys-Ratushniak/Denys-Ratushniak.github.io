import React from "react";
import { useState } from "react";
import "../sass/create-user.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Message from "./Message";

export default function CreateUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        birthDate: "",
    });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        const data = Object.fromEntries(
            Object.entries(formData).filter(([, v]) => v !== "")
        );
        if (data.password !== data.confirmPassword) {
            Message("Passwords do not match", "error");
        } else {
            delete data.confirmPassword;

            const config = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                },
            };
            try {
                const response = await axios.post(
                    "http://127.0.0.1:5000/user",
                    data,
                    config
                );
                Message("User successfully created", "success");
                navigate("../account");
            } catch (error) {
                // console.log(error.response.data);
                if (
                    error.response.data.code === 400 &&
                    error.response.data.error.slice(2, 11) === "birthDate"
                ) {
                    Message(
                        "Birth date should be entered earlier than current date",
                        "error"
                    );
                } else {
                    Message(error.response.data.error, "error");
                }
            }
        }
    };

    return (
        <main className="create-user-container">
            <section className="create-user-section">
                <div className="user-creation-dialog">
                    <p className="create-user-general">Create an account</p>
                    <form className="create-user-form" id="create-user-form">
                        <label className="input-label" htmlFor="username">Username *</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            minLength="5"
                            maxLength="20"
                            pattern="[a-zA-Z][a-zA-Z\d\.-_]{4,120}$"
                            title="Username must be between 5 and 20 characters and contain only letters and numbers."
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="firstName">First Name *</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                            minLength="2"
                            maxLength="20"
                            pattern="[A-Za-z]+"
                            title="firstName must be between 2 and 20 characters and contain only letters."
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="lastName">Last Name *</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                            minLength="2"
                            maxLength="20"
                            pattern="[A-Za-z]+"
                            title="lastName must be between 2 and 20 characters and contain only letters."
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="email">Email *</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            title="Please enter a valid email address."
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="password">Password *</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            minLength="8"
                            title="password must contain at least 8 characters"
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="confirmPassword">
                            Confirm Password *
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            minLength="8"
                            title="confirm password must contain at least 8 characters"
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\s0-9]{4,20}$"
                            className="input-field"
                            onChange={handleInputChange}
                        />

                        <label className="input-label" htmlFor="birthDate">Birth Date</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            className="input-field"
                            onChange={handleInputChange}
                        />
                    </form>

                    <button
                        type="submit"
                        className="create-user-button"
                        id="create-user-button"
                        onClick={handleSubmit}
                    >
                        Create User
                    </button>
                </div>
            </section>
        </main>
    );
}
