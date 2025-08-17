import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authenticateToken } from '../middlewares/authMiddleware';

const router = Router();
router.use(authenticateToken);

router.post('/', orderController.createOrder); // Crear o recuperar carrito
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.post('/add-item', orderController.addItem); // Agregar/editar producto
router.post('/remove-item', orderController.removeItem); // Eliminar producto
router.put('/:id/confirm', orderController.confirmOrder); // Confirmar orden
router.put('/:id/cancel', orderController.cancelOrder); // Cancelar orden
router.delete('/:id', orderController.deleteOrder); // Eliminar orden pendiente

export default router;
