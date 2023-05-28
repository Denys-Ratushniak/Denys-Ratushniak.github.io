import React from "react";
import { useState, useEffect } from "react";
import "../sass/booking.scss";
import Modal from "react-modal";
import axios from "axios";
import Message from "./Message";

export default function Booking() {
    const [classrooms, setClassrooms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        classroomId: 0,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        formData.start_time =
            formData.startDate + " " + formData.startTime + ":00";
        formData.end_time = formData.endDate + " " + formData.endTime + ":00";
        delete formData.endDate;
        delete formData.endTime;
        delete formData.startDate;
        delete formData.startTime;
        try {
            const options = {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: sessionStorage.getItem("Authorization"),
                },
            };
            const response = await axios.post(
                "http://127.0.0.1:5000/booking/order",
                formData,
                options
            );
            Message("Classroom was successfully booked", "success");
        } catch (error) {
            if (
                error.response.data.code === 400 &&
                error.response.data.error.slice(2, 12) === "start_time"
            ) {
                Message(
                    "The selected booking start time(and date) cannot be in the past", "error"
                );
            } else if (
                error.response.data.code === 400 &&
                error.response.data.error.slice(2, 10) === "end_time"
            ) {
                Message(
                    "The selected booking end time(and date) cannot be in the past", "error"
                );
            } else {
                Message(error.response.data.error, "error");
            }
        }
        setShowModal(false);
    };

    useEffect(() => {
        async function fetchClassrooms() {
            try {
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: sessionStorage.getItem("Authorization"),
                    },
                    body: JSON.stringify({
                        status: ["available", "unavailable"],
                    }),
                };
                const response = await fetch(
                    "http://127.0.0.1:5000/classroom/findByStatus",
                    options
                );
                
                const data = (await response.json()).slice(0, -1);
                setClassrooms(data);
            } catch (error) {
                console.error("Failed to fetch classrooms:", error);
            }
        }

        fetchClassrooms();
    }, []);

    return (
        <>
            <Modal
                isOpen={showModal}
                ariaHideApp={false}
                onRequestClose={() => setShowModal(false)}
                contentLabel="Booking Form"
                size="sm" role="modal-booking" data-testid="modal-booking" >
                <div className="booking-section-over" >
                    <h2 className="book-head">Book a Classroom</h2>
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <label className="input-label-booking" htmlFor="startDate"> Start Date </label>
                        <input className="input-field-booking" required={true}
                            type="date" id="startDate" name="startDate" onChange={handleInputChange}/>
                        <label className="input-label-booking" htmlFor="startTime" role="start-time"></label>
                        <input className="input-field-booking" required={true}
                            type="time" id="startTime" name="startTime" onChange={handleInputChange}/>
                        <label className="input-label-booking" htmlFor="endDate">End Date</label>
                        <input className="input-field-booking" required={true}
                            type="date" id="endDate" name="endDate" onChange={handleInputChange}/>
                        <label className="input-label-booking" htmlFor="endTime" role="end-time"></label>
                        <input
                            className="input-field-booking" required={true}
                            type="time" id="endTime" name="endTime" onChange={handleInputChange}
                        />
                        <button type="submit" className="book-button-booking" role="second-book-button"> Book </button>
                        <button className="cancel-button-booking" onClick={() => setShowModal(false)} > Cancel </button>
                    </form>
                </div>
            </Modal>
            <div className="booking-container" data-testid="booking">
                <div className="classroom-container">
                    {classrooms.map((classroom, index) => (
                        <div key={index} className="classroom">
                            <div className="classroom-info">
                                <p className="classroom-name">
                                    Classroom name: {classroom.name}
                                </p>
                                <p className="classroom-capacity">
                                    Capacity: {classroom.capacity}
                                </p>
                            </div>
                            <button
                                className="book-button"
                                role="first-book-button"
                                onClick={() => {
                                    setFormData({
                                        ...formData,
                                        classroomId: classroom.id,
                                    });
                                    setShowModal(true);
                                }}
                            >
                                Book
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
