import { Product } from '../models/Product';

// Obtener todos los productos
export const getAllProducts = () => Product.findAll();

// Obtener producto por id
export const getProductById = async (id: string) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product;
};

// Crear producto
export const createProduct = (data: { name: string; price: number; stock: number }) => {
  return Product.create(data);
};

// Actualizar producto
export const updateProduct = async (id: string, data: any) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  return product.update(data);
};

// Eliminar producto
export const deleteProduct = async (id: string) => {
  const product = await Product.findByPk(id);
  if (!product) throw new Error('Product not found');
  await product.destroy();
  return true;
};
