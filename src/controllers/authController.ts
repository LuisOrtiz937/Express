// src/controllers/authController.ts
import { Request, Response } from 'express';
import * as authService from '../services/authService'; // ✅ antes estaba userService

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await authService.registerUser(username, email, password); // ✅ usar authService
    res.status(201).json({ message: 'User created', user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password); // ✅ usar authService
    res.json({ user, token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
};
