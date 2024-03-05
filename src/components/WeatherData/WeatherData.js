import React from 'react';
import './WeatherData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
          faMapMarkerAlt,
          faThermometerHalf,
          faTint
        }
from '@fortawesome/free-solid-svg-icons';

const WeatherDisplay = ({ weatherData }) => {
  // const formatTimestamp = (timestamp) => {
  //   const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  //   return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  // };

  return (
    <div className="weather-container">
      <div className="location-item">
        <p className="weather-location">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          <span className="label-location"> {weatherData.location}</span>
        </p>
      </div>
      <div className="weather-item">
        <p className="weather-temp">
          {weatherData.temperature}°C
          <img
          src={`https://openweathermap.org/img/wn/${weatherData.icons}@2x.png`}
          alt={weatherData.conditions}
        />
        </p>
        <p className="weather-condition">{weatherData.conditions}</p>
      </div>
      <div className="weather-item">
        <p className="value">
          <FontAwesomeIcon icon={faThermometerHalf} /> <span className="label">
            {weatherData.feelsLike}°C
          </span>
        </p>
        <p className="value">
          <FontAwesomeIcon icon={faTint} /> <span className="label">
            {weatherData.humidity}%
          </span>
          
        </p>
      </div>
    </div>
  );
};

export default WeatherDisplay;
