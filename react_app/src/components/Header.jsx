import React from "react";
import { Link } from "react-router-dom";
import "../sass/header.scss";
import logo_img from "../images/logo-transparent.png";
import drowdown_menu_img from "../images/drowdown-menu.png";

export default function Header() {
    return (
        <header className="header" data-testid="header">
            <div className="logo-container">
                <img src={logo_img} className="logo-img" />
                <p className="logo-font">
                    <Link to="/home"> Сlass Booking Service</Link>
                </p>
            </div>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li>
                        <Link to="/booking">Booking</Link>
                    </li>
                    <li>
                        <Link to="/contact-us">Contact Us</Link>
                    </li>
                    <li>
                        <Link to="/account">Account</Link>
                    </li>
                </ul>
                <div className="dropdown-menu">
                    <img
                        src={drowdown_menu_img}
                        className="dropdown-menu-img"
                    />
                    <ul className="dropdown-menu-info">
                        <li>
                            <Link to="/booking">Booking</Link>
                        </li>
                        <li>
                            <Link to="/contact-us">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/account">Account</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
}
