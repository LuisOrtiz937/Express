import { Role } from '../models/Role';
import { User } from '../models/User';
import { Permission } from '../models/Permission';

export const createRole = async (name: string, description?: string) => {
  const existing = await Role.findOne({ where: { name } });
  if (existing) throw new Error(`Role ${name} already exists`);

  return Role.create({ name, description });
};

export const getAllRoles = async () => {
  return Role.findAll({
    include: [{ model: Permission, as: 'permissions' }],
  });
};

export const getRoleById = async (id: string) => {
  const role = await Role.findByPk(id, {
    include: [{ model: Permission, as: 'permissions' }],
  });
  if (!role) throw new Error('Role not found');
  return role;
};

export const updateRole = async (id: string, data: Partial<{ name: string; description: string }>) => {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  await role.update(data);
  return role;
};

export const deleteRole = async (id: string) => {
  const role = await Role.findByPk(id);
  if (!role) throw new Error('Role not found');

  await role.destroy();
  return true;
};

export const assignRoleToUser = async (userId: string, roleId: string) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error('User not found');

  const role = await Role.findByPk(roleId);
  if (!role) throw new Error('Role not found');

  await (user as any).addRole(role);
  return { user, role };
};

export const assignPermissionsToRole = async (roleId: string, permissionIds: string[]) => {
  const role = await Role.findByPk(roleId);
  if (!role) throw new Error('Role not found');

  const permissions = await Permission.findAll({ where: { id: permissionIds } });
  if (permissions.length !== permissionIds.length) throw new Error('Some permissions not found');

  await (role as any).setPermissions(permissions); // Reemplaza los permisos actuales del rol
  return await Role.findByPk(roleId, { include: [{ model: Permission, as: 'permissions' }] });
};