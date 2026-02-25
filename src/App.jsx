import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeatherByCity } from './services/api';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Handle weather search for a city
   * @param {string} cityName - Name of the city to search
   */
  const handleSearch = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchWeatherByCity(cityName);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header className="app-header">
        <h1 className="app-title">Weather Dashboard</h1>
        <p className="app-subtitle">Get current weather information for any city</p>
      </header>

      <main className="main-content">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner">⟳</div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-state">
            <div className="error-icon">⚠️</div>
            <p className="error-message">{error}</p>
          </div>
        )}

       
        {weatherData && !loading && (
          <WeatherCard weatherData={weatherData} />
        )}

       
        {!weatherData && !loading && !error && (
          <div className="initial-state">
            <div className="welcome-icon">🌤️</div>
            <h2>Welcome to Weather Dashboard</h2>
            <p>Search for a city to see current weather information</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
