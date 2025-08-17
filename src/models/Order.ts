import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Order extends Model {
  public id!: string;
  public userId!: string;
  public status!: 'pending' | 'confirmed' | 'canceled';
  public total!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'canceled'),
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
  }
);
