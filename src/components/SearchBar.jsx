/**
 * SearchBar Component
 * Handles city search input and submission
 */

import { useState } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate input
    if (!city.trim()) {
      return;
    }

    // Call parent search function
    onSearch(city.trim());
  };

  /**
   * Handle input change
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="search-input-group">
          <input
            type="text"
            value={city}
            onChange={handleChange}
            placeholder="Enter city name..."
            className="search-input"
            disabled={loading}
            aria-label="City name"
          />
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className="search-button"
            aria-label="Search weather"
          >
            {loading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
