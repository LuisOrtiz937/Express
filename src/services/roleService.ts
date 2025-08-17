// src/services/roleService.ts
import { Role, User } from '../models';

export const createRole = async (name: string, description: string) => {
  const [role] = await Role.findOrCreate({ where: { name }, defaults: { name, description } });
  return role;
};

export const assignRoleToUser = async (userId: string, roleId: string) => {
  const user = await User.findByPk(userId);
  const role = await Role.findByPk(roleId);
  if (!user || !role) throw new Error('User or Role not found');
  await user.addRole(role);
  return { userId, roleId };
};
