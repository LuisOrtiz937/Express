import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './config/database';
import { initialSetup } from './seeders/initialSetup';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);   // /register, /login
app.use('/api/users', userRoutes);  // CRUD usuarios
app.use('/api/role', roleRoutes);   // CRUD roles

const startServer = async () => {
  await sequelize.sync({ alter: true }); // sincroniza tablas
  await initialSetup();
  app.listen(process.env.PORT || 3000, () =>
    console.log(`🚀 Server running on http://localhost:${process.env.PORT || 3000}`)
  );
};

startServer();
