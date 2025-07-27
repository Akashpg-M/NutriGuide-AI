import * as foodService from '../services/foodService.js';

const getFoodRecommendation = async (req, res) => {
  try {
    const { userId, latitude, longitude } = req.body;
    if (!userId || (!latitude && !longitude)) {
      return res.status(400).json({ error: 'Missing required parameters: userId and either latitude/longitude' });
    }
    const recommendation = await foodService.getFoodRecommendation(userId, { latitude, longitude });
    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getFoodRecommendation };
