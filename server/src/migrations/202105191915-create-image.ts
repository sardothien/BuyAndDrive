
import { QueryInterface, DataTypes } from 'sequelize';
import {Car, Image} from '../db'
export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(Image.tableName, {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      carId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: Car.tableName,
          key: 'id',
        },
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Image.tableName)
  },
};
