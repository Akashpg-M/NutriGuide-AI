import axios from 'axios';

const getWeatherData = async (latitude, longitude) => {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('WEATHER_API_KEY environment variable is not set');
    }
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
    );
    
    return {
      temperature: response.data.main.temp,
      description: response.data.weather[0].main,
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    throw new Error('Failed to fetch weather data: ' + error.message);
  }
};

export { getWeatherData };
