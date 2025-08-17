// src/services/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, Role } from '../models';

dotenv.config();

export const registerUser = async (username: string, email: string, password: string, roleName: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });

  const role = await Role.findOne({ where: { name: roleName }, include: ['permissions'] });
  if (!role) throw new Error('Role not found');

  await user.addRole(role);

  return { user, roles: [role] };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User not found');

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error('Invalid password');

  // Guardamos el id del usuario en el token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });

  return { user, token };
};
