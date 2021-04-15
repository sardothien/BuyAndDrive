import { Car, Cart, User } from '../db';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(Cart.tableName, {
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
      },
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Cart.tableName)
  },
};
