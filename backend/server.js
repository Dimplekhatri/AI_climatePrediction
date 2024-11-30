// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const app = express();
// const PORT = 5000;

// app.use(cors({ origin: "*" }));
// app.options('*', cors()); // Respond to preflight requests for all routes
// app.use(bodyParser.json());


// const WEATHER_API_KEY = 'vhhxatiOBlqpUZ4TmjgQXQiiWIhoRp4M'; // Replace with your actual key
// const WEATHER_API_URL = 'https://api.tomorrow.io/v4/weather/realtime';


// app.post('/predict', async (req, res) => {
//   console.log("Recieved Req");
//   const { location } = req.body;
//   console.log("location is", location);

//   try {
//     console.log("helllooooo from predict");
//     // Fetch weather data for the given location
//     const weatherResponse = await axios.get(WEATHER_API_URL, {
//       params: { location: location, apikey: WEATHER_API_KEY },
//     });

//     const weatherData = weatherResponse.data.data;
//     console.log('Weather data received:', weatherData);

//     if (!weatherData) {
//       return res.status(400).json({ error: 'Weather data not found.' });
//     }

//     const { values, location: loc } = weatherData;
//     const { windSpeed, temperature, humidity, pressureSurfaceLevel, dewPoint, precipitationProbability } = values;


//     const dataToSend = {
//       features: [
//         location.lat,
//         location.lon,
//         windSpeed,
//         temperature,
//         humidity,
//         pressureSurfaceLevel,
//         dewPoint,
//         precipitationProbability,
//       ],
//     };

//     // Call Flask API
//     const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', dataToSend);
//     res.json(predictionResponse.data); // Send prediction result to the frontend
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Failed to process the prediction request.' });
//   }
// });


// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Allow all origins for CORS
app.use(cors({ origin: "*" }));
app.options('*', cors()); // Respond to preflight requests for all routes
app.use(bodyParser.json());

const WEATHER_API_KEY = 'vhhxatiOBlqpUZ4TmjgQXQiiWIhoRp4M'; // Replace with your actual key
const WEATHER_API_URL = 'https://api.tomorrow.io/v4/weather/realtime';

let previousWeatherData = null; // Store previous weather data to calculate changes

app.get('/', (req, res) => res.send('Backend is working'));


app.post('/predict', async (req, res) => {
  console.log("Received Req");

  const { location } = req.body;
  console.log("Location is", location);

  try {
    console.log("Fetching weather data for location:", location);

    // Fetch weather data from Tomorrow.io API
    const weatherResponse = await axios.get(WEATHER_API_URL, {
      params: { location: location, apikey: WEATHER_API_KEY },
    });

    const weatherData = weatherResponse.data.data;
    console.log('Weather data received:', weatherData);

    if (!weatherData || !weatherData.values) {
      return res.status(400).json({ error: 'Weather data not found.' });
    }

    const { values, location: loc } = weatherData;
    const { windSpeed, temperature, humidity, pressureSurfaceLevel, dewPoint, precipitationProbability } = values;

    // Calculate changes from the previous weather data
    let WS2M_Change = 0;
    let T2M_Change = 0;
    let Precip_Change = 0;

    if (previousWeatherData) {
      WS2M_Change = windSpeed - previousWeatherData.windSpeed;
      T2M_Change = temperature - previousWeatherData.temperature;
      Precip_Change = precipitationProbability - previousWeatherData.precipitationProbability;
    }

    // Store current data as previous for the next prediction
    previousWeatherData = { windSpeed, temperature, precipitationProbability };

    // Send the features to the Flask API
    const dataToSend = {
      features: [
        location.lat,
        location.lon,
        windSpeed,
        temperature,
        humidity,
        pressureSurfaceLevel,
        dewPoint,
        precipitationProbability,
      ],
    };

    const predictionResponse = await axios.post('http://127.0.0.1:5000/predict', dataToSend);
    res.json(predictionResponse.data); // Send prediction result to the frontend

  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({ error: 'Failed to process the prediction request.' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
