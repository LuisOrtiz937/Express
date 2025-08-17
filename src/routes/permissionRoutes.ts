import { Router } from 'express';
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission
} from '../controllers/permissionController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(authenticateToken);

router.post('/', createPermission);        // Crear permiso
router.get('/', getAllPermissions);       // Listar todos los permisos
router.get('/:id', getPermissionById);    // Obtener permiso por ID
router.put('/:id', updatePermission);     // Actualizar permiso
router.delete('/:id', deletePermission);  // Eliminar permiso

export default router;
