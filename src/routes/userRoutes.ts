import { Router } from 'express';
import { getAllUsers, getUserById, deleteUser, updateUser } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas ahora requieren token
router.use(authenticateToken);

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;
