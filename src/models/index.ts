import { User } from './User';
import { Role } from './Role';
import { Permission } from './Permission';

// User <-> Role (muchos a muchos)
User.belongsToMany(Role, { through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', foreignKey: 'roleId', as: 'users' });

// Role <-> Permission (muchos a muchos)
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId', as: 'permissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId', as: 'roles' });

export { User, Role, Permission };
