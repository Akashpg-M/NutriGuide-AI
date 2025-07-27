import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createOrGetUser = async (userId) => {
  try {
    // Check if user exists
    const existingUser = await prisma.userMedical.findUnique({
      where: { userId }
    });

    if (existingUser) {
      return existingUser;
    }

    // Create new user with empty conditions
    return await prisma.userMedical.create({
      data: {
        userId,
        conditions: []
      }
    });
  } catch (error) {
    console.error('Error in createOrGetUser:', error);
    throw new Error('Failed to create or get user');
  }
};
