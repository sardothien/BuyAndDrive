import { User } from '../db';
import { QueryInterface, DataTypes } from 'sequelize';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(User.tableName, {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(User.tableName)
  },
};
