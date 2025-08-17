// src/routes/productRoutes.ts
import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();

// Todas las rutas requieren estar autenticado
router.use(authenticateToken);

router.get('/', getAllProducts);        // Listar todos los productos
router.get('/:id', getProductById);     // Obtener un producto por ID
router.post('/', createProduct);        // Crear producto
router.put('/:id', updateProduct);      // Actualizar producto
router.delete('/:id', deleteProduct);   // Eliminar producto

export default router;
