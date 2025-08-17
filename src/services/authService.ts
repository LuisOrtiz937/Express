import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Redis from 'ioredis';

dotenv.config();

// Conexión a Redis
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const registerUser = async (username: string, email: string, password: string) => {
  const user = await User.create({ username, email, password });
  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid password');

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  return { user, token };
};

export const logoutUser = async (token: string) => {
  const payload: any = jwt.decode(token);
  if (!payload?.exp) return;

  const expiresIn = payload.exp - Math.floor(Date.now() / 1000);
  if (expiresIn > 0) {
    await redis.set(token, 'revoked', 'EX', expiresIn);
  }
};

export const isTokenRevoked = async (token: string) => {
  const revoked = await redis.get(token);
  return !!revoked;
};
