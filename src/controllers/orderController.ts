import { Request, Response } from 'express';
import * as orderService from '../services/orderService';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    res.json(await orderService.createOrder(userId));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllOrders = async (_req: Request, res: Response) => {
  try {
    res.json(await orderService.getAllOrders());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    res.json(await orderService.getOrderById(req.params.id));
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
};

export const addItem = async (req: Request, res: Response) => {
  try {
    const { orderId, productId, quantity } = req.body;
    res.json(await orderService.addItemToOrder(orderId, productId, quantity));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const removeItem = async (req: Request, res: Response) => {
  try {
    const { orderId, productId } = req.body;
    res.json(await orderService.removeItemFromOrder(orderId, productId));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const confirmOrder = async (req: Request, res: Response) => {
  try {
    res.json(await orderService.confirmOrder(req.params.id));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    res.json(await orderService.cancelOrder(req.params.id));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    res.json(await orderService.deleteOrder(req.params.id));
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
