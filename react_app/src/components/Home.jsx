import React from 'react';
import '../sass/home.scss';

export default function Home() {
    return (
        <main className="home-container">
            <section className="welcome-section">
                <div className="welcome">
                    <p className="welcome-general">
                        Welcome to Class Booking Service! <br />
                    </p>
                    <p className="welcome-info">
                        Our service allows you to book classes with ease. Create an account
                        in section account. Then go to section booking and browse selection
                        of classes. Book the ones that interest you. Good luck!
                    </p>
                </div>
            </section>
        </main>
    )
}
