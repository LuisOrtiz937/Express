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

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.json(roles);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await roleService.getRoleById(req.params.id);
    res.json(role);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.updateRole(req.params.id, req.body);
    res.json(role);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    await roleService.deleteRole(req.params.id);
    res.json({ message: 'Role deleted' });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
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


export const assignPermissionsToRole = async (req: Request, res: Response) => {
  try {
    const { roleId, permissionIds } = req.body;
    const role = await roleService.assignPermissionsToRole(roleId, permissionIds);
    res.json({ message: 'Permissions assigned', role });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};