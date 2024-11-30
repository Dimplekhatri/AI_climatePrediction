import React from "react";
import "./Home.css";

function Home() {

    const handleClick = () => {
        window.location.href = '/predictions';
    }



    return (
        <div className="home">
            <header className="home-header">
                <h1 className="logo">🌤 Climate Prediction</h1>
                <nav>
                    <a href="#about-page">About</a>
                    <a href="#features">Features</a>
                    <a href="#services">Services</a>
                    <a href="#contact">Contact</a>
                </nav>
            </header>

            <section className="hero">
                <div className="hero-content">
                    <h2>Predicting a Better Future</h2>
                    <p>Real-time weather forecasts and climate insights tailored to your needs.</p>
                    <button className="cta-btn" onClick={handleClick}>Get Started</button>
                </div>
            </section>

        </div>
    );
}

export default Home;