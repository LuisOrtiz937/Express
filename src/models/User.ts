import { DataTypes, Model, BelongsToManyAddAssociationMixin } from 'sequelize';
import { sequelize } from '../config/database';
import bcrypt from 'bcrypt';
import { Role } from './Role';

export class User extends Model {
  public id!: string;
  public username!: string;
  public email!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // ✅ Métodos de asociación generados por Sequelize
  public addRole!: BelongsToManyAddAssociationMixin<Role, string>;
  public addRoles!: BelongsToManyAddAssociationMixin<Role, string>;
}

User.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'users',
    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

