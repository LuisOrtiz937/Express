import bcrypt from 'bcrypt';
import { User, Role, Permission } from '../models';

export const initialSetup = async () => {
  try {
    // ------------------------
    // Crear roles
    // ------------------------
    const rolesData = [
      { name: 'Admin', description: 'Administrator role' },
      { name: 'Empleado', description: 'Employee role' },
      { name: 'Cliente', description: 'Client role' },
      { name: 'Domiciliario', description: 'Delivery role' },
    ];

    const roles: Record<string, Role> = {};
    for (const r of rolesData) {
      const [role] = await Role.findOrCreate({ where: { name: r.name }, defaults: r });
      roles[r.name] = role;
    }

    // ------------------------
    // Crear permisos
    // ------------------------
    const permissionsData = [
      { name: 'manage_users', description: 'Can manage users' },
      { name: 'manage_orders', description: 'Can manage orders' },
      { name: 'view_products', description: 'Can view products' },
      { name: 'manage_roles', description: 'Can manage roles and permissions' },
    ];

    const permissions: Record<string, Permission> = {};
    for (const p of permissionsData) {
      const [perm] = await Permission.findOrCreate({ where: { name: p.name }, defaults: p });
      permissions[p.name] = perm;
    }

    // ------------------------
    // Asociar permisos al rol Admin
    // ------------------------
    await roles['Admin'].addPermissions(Object.values(permissions)); // llena RolePermissions

    // ------------------------
    // Crear usuario Admin inicial
    // ------------------------
    const hashedPassword = await bcrypt.hash('admin1234', 10);
    const [adminUser, userCreated] = await User.findOrCreate({
  where: { email: 'admin@ecommerce.com' },
  defaults: { username: 'superadmin', email: 'admin@ecommerce.com', password: 'admin1234' },
});

    if (userCreated) {
      await adminUser.addRole(roles['Admin']); // llena UserRoles
      console.log('✅ Usuario Admin inicial creado correctamente.');
    } else {
      console.log('⚠️ Usuario Admin ya existe.');
    }

    console.log('✅ Setup inicial completado.');
  } catch (err) {
    console.error('❌ Error en setup inicial:', err);
  }
};
