// src/controllers/roleController.ts
import { Request, Response } from 'express';
import * as roleService from '../services/roleService';

export const createRole = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const role = await roleService.createRole(name, description);
    res.status(201).json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const assignRoleToUser = async (req: Request, res: Response) => {
  try {
    const { userId, roleId } = req.body;
    const result = await roleService.assignRoleToUser(userId, roleId);
    res.json({ message: 'Role assigned', result });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
