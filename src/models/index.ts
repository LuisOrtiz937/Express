import { User } from './User';
import { Role } from './Role';
import { Permission } from './Permission';
import { Product } from './Product';
import { Order } from './Order';
import { OrderItem } from './OrderItem';

// --- User <-> Role (N:M)
User.belongsToMany(Role, { through: 'UserRoles', foreignKey: 'userId', as: 'roles' });
Role.belongsToMany(User, { through: 'UserRoles', foreignKey: 'roleId', as: 'users' });

// --- Role <-> Permission (N:M)
Role.belongsToMany(Permission, { through: 'RolePermissions', foreignKey: 'roleId', as: 'permissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions', foreignKey: 'permissionId', as: 'roles' });

// --- User 1:N Order
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// --- Order 1:N OrderItem
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

// --- Product 1:N OrderItem
Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

export { User, Role, Permission, Product, Order, OrderItem };
