import * as weatherService from './weatherService.js';
import * as medicalService from './medicalService.js';

// Fallback recommendations
const FALLBACK_RECOMMENDATIONS = [
  { name: 'Salad', reason: 'Light and healthy option suitable for most conditions' },
  { name: 'Soup', reason: 'Good for hydration and easy to digest' },
  { name: 'Grilled Chicken', reason: 'Lean protein that works well in most weather conditions' }
];

// Simple recommendation function without AI
const getSimpleRecommendation = (weatherCondition, medicalCondition) => {
  return FALLBACK_RECOMMENDATIONS.map(item => ({
    ...item,
    reason: `${item.reason} (Weather: ${weatherCondition}, Medical: ${medicalCondition || 'none'})`
  }));
};

// AI-based recommendation function (if AI is available)
let generateFoodRecommendation = null;

try {
  // Try to dynamically import AI if available
  const { ai } = await import('../ai/genkit.js');
  
  if (ai) {
    const generateFoodRecommendationPrompt = ai.definePrompt({
      name: 'generateFoodRecommendationPrompt',
      input: {
        schema: {
          type: 'object',
          properties: {
            weatherCondition: { type: 'string' },
            medicalCondition: { type: 'string' },
          },
          required: ['weatherCondition', 'medicalCondition'],
        },
      },
      output: {
        schema: {
          type: 'object',
          properties: {
            foodRecommendations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  reason: { type: 'string' },
                },
                required: ['name', 'reason'],
              },
            },
          },
          required: ['foodRecommendations'],
        },
      },
      prompt: `
You are a food recommendation assistant. Based on the user's weather condition and medical condition, suggest 3 to 5 suitable food items. 
For each item, include a short reason why it's a good choice.

Weather: {{{weatherCondition}}}
Medical Condition: {{{medicalCondition}}}

Respond in JSON format with a 'foodRecommendations' array containing objects with 'name' and 'reason'.
`,
    });

    generateFoodRecommendation = async (input) => {
      try {
        const { output } = await generateFoodRecommendationPrompt(input);
        return output;
      } catch (error) {
        console.error('AI recommendation failed:', error);
        return {
          foodRecommendations: getSimpleRecommendation(
            input.weatherCondition,
            input.medicalCondition
          )
        };
      }
    };
  }
} catch (error) {
  console.log('AI module not available, using fallback recommendations');
  generateFoodRecommendation = async (input) => ({
    foodRecommendations: getSimpleRecommendation(
      input.weatherCondition,
      input.medicalCondition
    )
  });
}

export async function getFoodRecommendation(userId, { latitude, longitude, weather }) {
  let weatherCondition = weather?.condition;
  if (!weatherCondition && latitude && longitude) {
    const weatherData = await weatherService.getWeather(latitude, longitude);
    weatherCondition = weatherData.condition;
  }
  if (!weatherCondition) weatherCondition = 'mild';

  // 2. Get medical condition (as a string)
  let medicalCondition = 'none';
  const medical = await medicalService.getMedicalCondition(userId);
  if (medical && Array.isArray(medical.conditions) && medical.conditions.length > 0) {
    medicalCondition = medical.conditions.join(', ');
  }

  // 3. Call the AI prompt
  try {
    const aiResult = await generateFoodRecommendation({ weatherCondition, medicalCondition });
    return {
      userId,
      weather: weatherCondition,
      medicalConditions: medicalCondition,
      recommendations: aiResult.foodRecommendations,
    };
  } catch (error) {
    // Fallback if AI fails
    return {
      userId,
      weather: weatherCondition,
      medicalConditions: medicalCondition,
      recommendations: [
        { name: 'Salad', reason: 'Light and healthy option suitable for most conditions' },
        { name: 'Soup', reason: 'Good for hydration and easy to digest' },
        { name: 'Grilled Chicken', reason: 'Lean protein that works well in most weather conditions' }
      ],
      error: error.message,
    };
  }
}
