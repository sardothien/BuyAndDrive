import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';
import { Car, User } from '../db';

export interface FavouriteAttributes {
  id?: string;
  carId: string;
  userId: string;
}

export interface FavouriteModel extends Model<FavouriteAttributes>, FavouriteAttributes {}
export class Favourite extends Model<FavouriteModel, FavouriteAttributes> {}

export type FavouriteStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): FavouriteModel;
}

export const FavouriteC = (sequelize: Sequelize): FavouriteStatic => {
  return sequelize.define(
    'Favourite', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      carId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Car.tableName,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User.tableName,
          key: 'id',
        },
      }
    }, {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
