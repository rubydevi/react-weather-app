import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherData from './components/WeatherData/WeatherData';
import './App.css';
import io from 'socket.io-client';

const App = () => { //{ onLocationUpdate }
  const [location, setLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);  
  const baseUrl = 'http://localhost:5000/api/weather';

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const success = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      fetchWeatherData(latitude, longitude);
      // onLocationUpdate({ latitude, longitude });
    };

    const error = (err) => {
      setError(`Unable to retrieve your location: ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.post(baseUrl, { latitude, longitude });
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError('Error fetching weather data');
      setWeatherData(null);
    }
  };

  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('weatherUpdate', (data) => {
      console.log('Received weather update:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="main">
      {error && <p>{error}</p>}
      {location && weatherData && (
        <WeatherData weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;
