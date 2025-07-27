import { createOrGetUser } from '../services/userService.js';

const createUserHandler = async (req, res) => {
  try {
    const { userId } = req.body; // changed from req.params

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await createOrGetUser(userId);

    res.status(200).json({
      success: true,
      data: {
        userId: user.userId,
        conditions: user.conditions,
        updatedAt: user.updatedAt
      }
    });
  } catch (error) {
    console.error('Error in createUserHandler:', error);
    res.status(500).json({ 
      success: false,
      error: error.message || 'Failed to create or get user' 
    });
  }
};

export { createUserHandler };