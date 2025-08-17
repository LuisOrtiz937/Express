import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Role extends Model {
  public id!: string;
  public name!: string;
  public description!: string;
}

Role.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: true },
  },
  { sequelize, tableName: 'roles' }
);
