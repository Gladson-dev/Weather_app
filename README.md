# Weather Dashboard

A modern, responsive Weather Dashboard built with React and Vite. This application allows users to search for weather information by city name and displays current weather conditions in a clean, minimal interface.

## Features

- **City Search**: Search weather by city name
- **Weather Display**: Shows temperature, conditions, humidity, and pressure
- **Current Date**: Displays the current date
- **Loading States**: Smooth loading animations during API calls
- **Error Handling**: User-friendly error messages for invalid cities
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Clean, minimal design with gradient backgrounds and smooth animations

## Technology Stack

- **React 19** - Modern React with functional components and hooks
- **Vite** - Fast development server and build tool
- **JavaScript** - ES6+ features
- **CSS3** - Modern CSS with animations and responsive design
- **Indian Weather API** - Weather data source for Indian cities (IMD) and global locations

## Project Structure

```
src/
├── components/
│   ├── SearchBar.jsx      # City search input component
│   └── WeatherCard.jsx    # Weather display component
├── services/
│   └── api.js            # API service for weather data
├── App.jsx               # Main application component
├── App.css               # Application styles
└── main.jsx              # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd weather-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Get an API Key** (for Indian Weather API):
   - Visit [Indian Weather API](https://indianapi.in/weather-api) to get your free API key
   - Sign up for free and receive 1000 requests
   - Replace `YOUR_API_KEY_HERE` in `src/services/api.js` with your actual API key

   **Note**: The app is configured to use Indian Weather API by default. It first tries Indian cities, then falls back to global weather data.

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and navigate to `http://localhost:5173`

## Usage

1. **Search for a city**: Type the city name in the search bar and press Enter or click Search
2. **View weather data**: See temperature, conditions, humidity, and pressure
3. **Error handling**: If a city is not found, you'll see a helpful error message
4. **Responsive**: The app works on both desktop and mobile devices

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

### Using Indian Weather API (Default)

The app is configured to use Indian Weather API by default. This API provides:

- **Indian Cities**: Detailed weather data from Indian Meteorological Department (IMD)
- **Global Cities**: Aggregated weather data from various providers worldwide

To use it:

1. Get a free API key from [Indian Weather API](https://indianapi.in/weather-api)
2. Replace `YOUR_API_KEY_HERE` in `src/services/api.js`

**API Behavior**:
- First tries to fetch data from Indian cities endpoint
- If city not found in India, automatically falls back to global endpoint
- Provides comprehensive weather data for both Indian and international locations

### API Response Format

The API service automatically transforms the Indian API responses to match our component format:

```javascript
{
  city: "City Name",
  country: "India" | "Global", 
  temperature: 25, // Celsius
  condition: "Weather description",
  humidity: 65, // Percentage
  pressure: 1013, // hPa
  icon: null, // Indian API doesn't provide icons
  timestamp: 1234567890
}
```

## Component Overview

### SearchBar Component
- Handles city name input
- Form validation and submission
- Loading state management
- Keyboard accessibility

### WeatherCard Component
- Displays weather information
- Shows temperature, conditions, humidity, and pressure
- Weather icon display
- Current date display

### API Service
- Centralized API calls
- Error handling
- Data transformation
- Easy to modify for different APIs

## Styling

The application uses modern CSS with:
- Gradient backgrounds
- Smooth animations and transitions
- Responsive grid layouts
- Mobile-first design approach
- Clean, minimal aesthetic

## Browser Support

- Chrome/Chromium 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.
