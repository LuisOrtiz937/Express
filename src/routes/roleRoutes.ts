// src/routes/roleRoutes.ts
import { Router } from 'express';
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
  assignRoleToUser,
  assignPermissionsToRole
} from '../controllers/roleController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas requieren estar autenticado
router.use(authenticateToken);

router.post('/', createRole);               // Crear rol
router.get('/', getAllRoles);              // Listar todos los roles
router.get('/:id', getRoleById);           // Obtener un rol por ID
router.put('/:id', updateRole);            // Actualizar rol
router.delete('/:id', deleteRole);         // Eliminar rol
router.post('/assign-role', assignRoleToUser);  // Asignar rol a usuario
router.post('/assign-permissions', assignPermissionsToRole); // Asignar permisos a usuario

export default router;
