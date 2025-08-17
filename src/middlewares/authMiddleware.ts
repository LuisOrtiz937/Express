// src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1]; // Formato "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { id: string };
    (req as any).user = payload; // ahora tienes req.user.id disponible
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
