
import { QueryInterface, DataTypes } from 'sequelize';
import { Car, User,Favourite } from '../db';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(Favourite.tableName, {
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
    }, {
      uniqueKeys: {
        Items_unique: {
            fields: ['carId', 'userId']
        }
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Favourite.tableName)
  },
};
