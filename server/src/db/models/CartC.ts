import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Car, User } from '../db';

export interface CartAttributes {
  id?: string;
  userId: string;
  carId: string;
}

export interface CartModel extends Model<CartAttributes>, CartAttributes {}
export class Cart extends Model<CartModel, CartAttributes> {}

export type CartStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): CartModel;
}

export const CartC = (sequelize: Sequelize): CartStatic => {
  return sequelize.define(
    'Carts', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      carId: {
        type: DataTypes.UUID,
        allowNull: false
      },
    }, {
      freezeTableName: true,
    }
  );
};