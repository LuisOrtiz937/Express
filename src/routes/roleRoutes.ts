// src/routes/roleRoutes.ts
import { Router } from 'express';
import { createRole, assignRoleToUser } from '../controllers/roleController';

const router = Router();

router.post('/', createRole);              // Crear rol
router.post('/assign', assignRoleToUser);  // Asignar rol a usuario

export default router;
