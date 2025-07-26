import * as weatherService from '../services/weatherService.js';

const getWeather = async (req, res) => {
  try {
    // const { lat, lon } = req.query;
    // if (!lat || !lon) {
    //   return res.status(400).json({ error: 'Missing coordinates: lat and lon' });
    // }
    const lat = 12.751493;
    const lon = 80.196708;

    const weatherData = await weatherService.getWeather(lat, lon);
    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getWeather };
