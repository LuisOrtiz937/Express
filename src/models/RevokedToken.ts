// src/models/RevokedToken.ts
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class RevokedToken extends Model {
  public token!: string;
  public readonly createdAt!: Date;
}

RevokedToken.init(
  {
    token: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  },
  { sequelize, tableName: 'revoked_tokens' }
);
