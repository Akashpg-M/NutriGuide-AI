import * as medicalService from '../services/medicalService.js';

const getMedicalCondition = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const medicalData = await medicalService.getMedicalCondition(userId);
    if (!medicalData) {
      return res.status(200).json({ userId, conditions: [] });
    }
    
    res.json(medicalData);
  } catch (error) {
    console.error('Error in getMedicalCondition:', error);
    res.status(500).json({ error: error.message });
  }
};

const setMedicalCondition = async (req, res) => {
  try {
    const { userId } = req.params;
    const { conditions } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    
    if (!conditions || !Array.isArray(conditions)) {
      return res.status(400).json({ error: 'Conditions must be an array' });
    }

    const updatedData = await medicalService.setMedicalCondition(userId, conditions);
    res.json(updatedData);
  } catch (error) {
    console.error('Error in setMedicalCondition:', error);
    res.status(500).json({ error: error.message });
  }
};

export { getMedicalCondition, setMedicalCondition };
