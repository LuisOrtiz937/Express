// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    if (!role) return res.status(400).json({ message: 'Role is required' });

    const { user, roles } = await authService.registerUser(username, email, password, role);
    res.status(201).json({ message: 'User created', user, roles });
  } catch (err: any) {
    console.error(err.errors || err);
    res.status(400).json({ message: err.message, details: err.errors });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
