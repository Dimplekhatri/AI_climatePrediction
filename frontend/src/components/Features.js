import React from "react";
import "./Features.css";

function Features() {
    return (
        <section id="features" className="features">
            <h3>Features</h3>
            <div className="feature-grid">
                <div className="feature-card">
                    <h4>Daily Weather Updates</h4>
                    <p>Stay informed about the daily forecast in your area.</p>
                </div>
                <div className="feature-card">
                    <h4>Climate Trends</h4>
                    <p>Analyze trends to understand long-term climate changes.</p>
                </div>
                <div className="feature-card">
                    <h4>Interactive Maps</h4>
                    <p>Explore global weather patterns with interactive maps.</p>
                </div>
                <div className="feature-card">
                    <h4>Disaster Alerts</h4>
                    <p>Receive early warnings for extreme weather conditions.</p>
                </div>
            </div>
        </section>
    );
}

export default Features;
