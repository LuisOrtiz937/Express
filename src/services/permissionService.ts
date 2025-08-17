import { Permission } from '../models/Permission';

// Crear permiso
export const createPermission = async (name: string, description?: string) => {
  const existing = await Permission.findOne({ where: { name } });
  if (existing) throw new Error(`Permission ${name} already exists`);
  return Permission.create({ name, description });
};

// Obtener todos los permisos
export const getAllPermissions = () => Permission.findAll();

// Obtener permiso por ID
export const getPermissionById = async (id: string) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new Error('Permission not found');
  return permission;
};

// Actualizar permiso
export const updatePermission = async (id: string, data: Partial<{ name: string; description: string }>) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new Error('Permission not found');
  return permission.update(data);
};

// Eliminar permiso
export const deletePermission = async (id: string) => {
  const permission = await Permission.findByPk(id);
  if (!permission) throw new Error('Permission not found');
  await permission.destroy();
  return true;
};
