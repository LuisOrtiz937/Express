// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { logoutUser } from '../services/authService';

const router = Router();

router.post('/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(400).json({ message: 'No token provided' });

    const token = authHeader.split(' ')[1];
    await logoutUser(token);
    res.json({ message: 'Logged out successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/register', register);
router.post('/login', login);

export default router;
