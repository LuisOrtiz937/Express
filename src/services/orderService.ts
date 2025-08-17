import { Order } from '../models/Order';
import { OrderItem } from '../models/OrderItem';
import { Product } from '../models/Product';

// Crear orden pendiente (carrito)
export const createOrder = async (userId: string) => {
  // Revisar si ya hay una orden pendiente
  let order = await Order.findOne({ where: { userId, status: 'pending' }, include: ['items'] });
  if (!order) {
    order = await Order.create({ userId, status: 'pending', total: 0 });
  }
  return order;
};

// Obtener todas las órdenes
export const getAllOrders = async () => {
  return Order.findAll({ include: [{ association: 'items', include: ['product'] }] });
};

// Obtener orden por ID
export const getOrderById = async (orderId: string) => {
  const order = await Order.findByPk(orderId, { include: [{ association: 'items', include: ['product'] }] });
  if (!order) throw new Error('Order not found');
  return order;
};

// Agregar o actualizar producto en orden pendiente
export const addItemToOrder = async (orderId: string, productId: string, quantity: number) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Cannot modify a confirmed or canceled order');

  const product = await Product.findByPk(productId);
  if (!product) throw new Error('Product not found');
  if (product.stock < quantity) throw new Error('Not enough stock');

  let item = await OrderItem.findOne({ where: { orderId, productId } });
  if (item) {
    item.quantity = quantity;
    await item.save();
  } else {
    item = await OrderItem.create({ orderId, productId, quantity, price: product.price });
  }

  // Recalcular total
  const items = await OrderItem.findAll({ where: { orderId } });
  order.total = items.reduce((sum, it) => sum + it.quantity * it.price, 0);
  await order.save();

  return item;
};

// Eliminar producto de orden pendiente
export const removeItemFromOrder = async (orderId: string, productId: string) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Cannot modify a confirmed or canceled order');

  const item = await OrderItem.findOne({ where: { orderId, productId } });
  if (!item) throw new Error('Item not found');
  await item.destroy();

  // Recalcular total
  const items = await OrderItem.findAll({ where: { orderId } });
  order.total = items.reduce((sum, it) => sum + it.quantity * it.price, 0);
  await order.save();

  return { message: 'Item removed' };
};

// Confirmar orden
export const confirmOrder = async (orderId: string) => {
  const order = await Order.findByPk(orderId, { include: [{ association: 'items', include: ['product'] }] });
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Order already confirmed or canceled');

  // Descontar stock
  for (const item of order.items as any) {
    const product = await Product.findByPk(item.productId);
    if (product && product.stock >= item.quantity) {
      product.stock -= item.quantity;
      await product.save();
    } else {
      throw new Error(`Not enough stock for product ${item.productId}`);
    }
  }

  order.status = 'confirmed';
  await order.save();
  return order;
};

// Cancelar orden
export const cancelOrder = async (orderId: string) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Only pending orders can be canceled');

  order.status = 'canceled';
  await order.save();
  return order;
};

// Eliminar orden pendiente
export const deleteOrder = async (orderId: string) => {
  const order = await Order.findByPk(orderId);
  if (!order) throw new Error('Order not found');
  if (order.status !== 'pending') throw new Error('Only pending orders can be deleted');
  await order.destroy();
  return { message: 'Order deleted successfully' };
};
