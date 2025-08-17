// src/services/userService.ts
import { User } from '../models/User';

// Obtener todos los usuarios con roles
export const getAllUsers = async () => {
  const users = await User.findAll({ include: [{ association: 'roles' }] });
  return users.map(u => {
    const { password, ...rest } = u.get({ plain: true });
    return rest;
  });
};

// Obtener usuario por id con roles
export const getUserById = async (id: string) => {
  const user = await User.findByPk(id, { include: [{ association: 'roles' }] });
  if (!user) return null;
  const { password, ...rest } = user.get({ plain: true });
  return rest;
};

// Borrar usuario
export const deleteUser = async (id: string) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');
  await user.destroy();
};


// Actualizar usuario
export const updateUser = async (id: string, data: Partial<{ username: string; email: string; password: string }>) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found');

  // Si vienen cambios en password, se actualizará automáticamente por el hook beforeUpdate
  await user.update(data);

  const { password, ...rest } = user.get({ plain: true });
  return rest;
};
