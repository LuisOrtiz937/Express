// src/migrations/20250816_create_user_roles.ts
import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const up = async () => {
  await sequelize.getQueryInterface().createTable('UserRoles', {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false },
    roleId: { type: DataTypes.UUID, allowNull: false },
    createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  });
};

export const down = async () => {
  await sequelize.getQueryInterface().dropTable('UserRoles');
};
