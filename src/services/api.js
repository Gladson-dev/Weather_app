/**
 * Weather API service
 * Handles all API calls to fetch weather data using Indian API
 */

// Indian Weather API configuration
const API_BASE_URL = 'https://weather.indianapi.in';
const API_KEY = 'sk-live-vrC5bV04rjPIjDbcijmlkKwD7gVHq5DrLmCW3Xli'; // Replace with your Indian API key
const API_TIMEOUT = 5000; // 5 second timeout

/**
 * Fetch weather data for an Indian city using Indian API
 * @param {string} cityName - Name of the city to get weather for
 * @returns {Promise} Weather data object
 */
export const fetchWeatherByCity = async (cityName) => {
  try {
    // Create timeout promise
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('API_TIMEOUT')), API_TIMEOUT);
    });

    // First try Indian cities endpoint with timeout
    const indianPromise = fetch(
      `${API_BASE_URL}/india/weather?city=${encodeURIComponent(cityName)}`,
      {
        headers: {
          'x-api-key': API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    const response = await Promise.race([indianPromise, timeoutPromise]);

    // If Indian city not found, try global endpoint
    if (!response.ok || response.status === 404) {
      const globalPromise = fetch(
        `${API_BASE_URL}/global/current?location=${encodeURIComponent(cityName)}`,
        {
          headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
          }
        }
      );

      const globalResponse = await Promise.race([globalPromise, timeoutPromise]);

      if (!globalResponse.ok) {
        if (globalResponse.status === 404) {
          throw new Error('City not found. Please check the city name and try again.');
        }
        throw new Error('Failed to fetch weather data. Please try again later.');
      }

      const globalData = await globalResponse.json();
      
      // Transform global data to match our format
      return {
        city: cityName,
        country: 'Global',
        temperature: Math.round(globalData.temperature || 0),
        condition: globalData.condition || 'Unknown',
        humidity: globalData.humidity || 0,
        pressure: globalData.pressure || 1013,
        icon: null,
        timestamp: Date.now()
      };
    }

    const data = await response.json();
    
    // Transform Indian API data to our format
    const currentWeather = data.weather?.current;
    if (!currentWeather) {
      throw new Error('Weather data not available for this city.');
    }

    return {
      city: data.city || cityName,
      country: 'India',
      temperature: Math.round(currentWeather.temperature?.max?.value || 0),
      condition: currentWeather.description || 'No description available',
      humidity: currentWeather.humidity?.morning || 0,
      pressure: currentWeather.pressure || 1013,
      icon: null,
      timestamp: Date.now()
    };
  } catch (error) {
    // Provide specific error messages
    if (error.message === 'API_TIMEOUT') {
      throw new Error('Weather service is not responding. Please try again in a moment.');
    }
    if (error.message.includes('fetch')) {
      throw new Error('Network error. Please check your internet connection.');
    }
    
    // Re-throw other errors for the component to handle
    throw error;
  }
};
