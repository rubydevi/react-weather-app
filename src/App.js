import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

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

  return (
    <div>
      {error && <p>{error}</p>}
      {location && (
        <p>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
      {weatherData && (
        <div>
          <h2>Weather</h2>
          <p>Location: {weatherData.location}</p>
          <p>Temperature: {weatherData.temperature}°C</p>
          <p>Conditions: {weatherData.conditions}</p>
          <p>Sunrise: {weatherData.sunrise}</p>
          <p>Sunset: {weatherData.sunset}</p>
          <p>Feels like: {weatherData.feelsLike}°C</p>
          <p>Pressure: {weatherData.pressure}hPa</p>
          <p>Minimum: {weatherData.minTemp}°C</p>
          <p>Maximum: {weatherData.maxTemp}°C</p>
          <p>Humidity: {weatherData.humidity}%</p>
          <p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.icons}@2x.png`} alt={weatherData.conditions} />
          </p>
        </div>
      )}
      {console.log(weatherData)}
    </div>
  );
}

export default App;
