/**
 * WeatherCard Component
 * Displays weather information for a city
 */

import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) {
    return null;
  }

  // Format current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Get weather icon URL (using OpenWeatherMap icons)
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div className="location-info">
          <h2 className="city-name">
            {weatherData.city}
            {weatherData.country && (
              <span className="country-code">, {weatherData.country}</span>
            )}
          </h2>
          <p className="current-date">{currentDate}</p>
        </div>
        {weatherData.icon && (
          <div className="weather-icon">
            <img
              src={getWeatherIconUrl(weatherData.icon)}
              alt={weatherData.condition}
              title={weatherData.condition}
            />
          </div>
        )}
      </div>

      <div className="weather-main">
        <div className="temperature-display">
          <span className="temperature-value">{weatherData.temperature}</span>
          <span className="temperature-unit">°C</span>
        </div>
        <div className="weather-condition">
          <p className="condition-text">{weatherData.condition}</p>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <div className="detail-icon">💧</div>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{weatherData.humidity}%</span>
          </div>
        </div>
        
        <div className="detail-item">
          <div className="detail-icon">🌡️</div>
          <div className="detail-info">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weatherData.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
