import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const getMedicalCondition = async (userId) => {
  try {
    // Convert userId to number
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new Error('Invalid user ID format');
    }
    
    const result = await prisma.userMedical.findUnique({
      where: { userId: userIdNumber },
    });
    
    // If no record found, return null to be handled by the controller
    if (!result) {
      return null;
    }
    
    // Ensure conditions is always an array
    return {
      ...result,
      conditions: result.conditions || []
    };
  } catch (error) {
    console.error('Error getting medical conditions:', error);
    throw new Error('Failed to fetch medical conditions: ' + error.message);
  }
};


const setMedicalCondition = async (userId, conditions) => {
  try {
    // Convert userId to number
    const userIdNumber = parseInt(userId, 10);
    if (isNaN(userIdNumber)) {
      throw new Error('Invalid user ID format');
    }
    
    if (!Array.isArray(conditions)) {
      throw new Error('Conditions must be an array');
    }
    
    // Ensure all conditions are strings
    const stringConditions = conditions.map(String);
    
    return await prisma.userMedical.upsert({
      where: { userId: userIdNumber },
      update: { conditions: { set: stringConditions } },
      create: { 
        userId: userIdNumber, 
        conditions: stringConditions 
      },
    });
  } catch (error) {
    console.error('Database error in setMedicalCondition:', error);
    throw new Error('Failed to set medical condition: ' + error.message);
  }
};

export { getMedicalCondition, setMedicalCondition };