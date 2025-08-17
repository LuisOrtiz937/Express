import { Request, Response } from 'express';
import * as permissionService from '../services/permissionService';

// Crear permiso
export const createPermission = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const permission = await permissionService.createPermission(name, description);
    res.status(201).json(permission);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Listar todos los permisos
export const getAllPermissions = async (_req: Request, res: Response) => {
  try {
    const permissions = await permissionService.getAllPermissions();
    res.json(permissions);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener permiso por ID
export const getPermissionById = async (req: Request, res: Response) => {
  try {
    const permission = await permissionService.getPermissionById(req.params.id);
    res.json(permission);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

// Actualizar permiso
export const updatePermission = async (req: Request, res: Response) => {
  try {
    const updated = await permissionService.updatePermission(req.params.id, req.body);
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar permiso
export const deletePermission = async (req: Request, res: Response) => {
  try {
    await permissionService.deletePermission(req.params.id);
    res.json({ message: 'Permission deleted' });
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};
