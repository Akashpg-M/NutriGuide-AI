import express from 'express';
import { getWeather } from '../controllers/weatherController.js';
import { getMedicalCondition, setMedicalCondition } from '../controllers/medicalController.js';
import { getFoodRecommendation } from '../controllers/foodController.js';
// import { validateQuery, validateBody } from '../middlewares/validate.js';
import { createUserHandler } from '../controllers/userController.js';

const router = express.Router();

router.post('/createuser', createUserHandler);
router.get('/weather', getWeather);
router.get('/medical/:userId', getMedicalCondition);
router.post('/medical/:userId', setMedicalCondition);
router.post('/recommend', getFoodRecommendation);

// router.post('/medical/:userId', validateBody(['conditions']), setMedicalCondition);
// router.post('/recommend', validateBody(['userId']), getFoodRecommendation);

export default router;