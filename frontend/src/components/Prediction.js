import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../components/Main.css';


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
</div>


const Prediction = () => {
    const [location, setLocation] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);

    // Function to handle prediction
    const getPrediction = async () => {
        if (!location.trim()) {
            setError('Location cannot be empty.');
            return;
        }

        setError(null); // Reset error before making a new request
        setPrediction(null); // Reset prediction

        try {
            console.log("Location sent to backend:", location);  // Log location
            // Send location to Node.js backend
            const response = await axios.post('http://localhost:5000/predict', {
                location: location.trim(),
            });
            console.log("Backend response:", response.data);  // Log full response

            // Get prediction result from the backend
            setPrediction(response.data.predicted_class);
        } catch (err) {
            setError(err.response?.data?.error || 'An error occurred while fetching the prediction.');
            console.error(err.message);
        }
    };

    // Function to get a message based on the prediction value
    const getPredictionMessage = () => {
        if (prediction === 1) {
            return 'Wind speed increase predicted.🍃';
        } else if (prediction === 2) {
            return 'Wind speed decrease predicted.🍃';
        } else if (prediction === 3) {
            return 'Temperature decrease predicted.🥶❄️';
        } else if (prediction === 4) {
            return 'Temperature increase predicted.🥵';
        } else if (prediction === 5) {
            return 'Rain predicted.☔';
        } else if (prediction === 6) {
            return 'Dry conditions expected.🏜️';
        } else {
            return 'No significant weather change predicted.😮‍💨';
        }
    };

    // Log prediction whenever it updates (debugging)
    useEffect(() => {
        console.log("Updated prediction state:", prediction);
    }, [prediction]);
    return (
        < div style={{ padding: '20px' }}>
            <h1>Climate Event Predictor</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter location (e.g., Delhi)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    style={{ padding: '10px', width: '300px', marginRight: '10px' }}
                />
                <button onClick={getPrediction} style={{ padding: '10px 20px' }}>
                    Predict
                </button>
            </div>

            {/* Display error message if any */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display prediction message if prediction is not null */}
            {
                prediction !== null && (
                    <p style={{ marginTop: '20px', fontSize: '18px' }}>
                        Prediction: <strong>{getPredictionMessage()}</strong>
                    </p>
                )
            }
        </div >
    );
}

export default Prediction;
