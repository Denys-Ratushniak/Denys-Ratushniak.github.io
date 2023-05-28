import React from "react";
import "../sass/footer.scss";

export default function Footer() {
    return (
        <footer className="footer" data-testid="footer">
            <p className="footer-text">Class Booking Service &copy; 2023</p>
            <p className="footer-message">All rights reserved.</p>
        </footer>
    );
}
