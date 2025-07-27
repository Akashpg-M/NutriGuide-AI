import { getWeatherData } from '../utils/weatherApi.js';

const getWeather = async (latitude, longitude) => {
  try {
    // Use provided coordinates instead of hardcoded values
    // const lat = latitude || 12.751493;
    // const lon = longitude || 80.196708;

    const lat = 12.751493;
    const lon = 80.196708;

    const weatherData = await getWeatherData(lat, lon);
    
    let condition = 'mild';
    if (weatherData.temperature < 10) condition = 'cold';
    else if (weatherData.temperature > 25) condition = 'hot';
    
    return {
      temperature: weatherData.temperature,
      condition,
      description: weatherData.description,
    };
  } catch (error) {
    console.error('Weather service error:', error);
    throw new Error('Failed to get weather data: ' + error.message);
  }
};

export { getWeather };
