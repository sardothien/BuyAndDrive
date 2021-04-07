import { QueryInterface, DataTypes } from 'sequelize';
import { User, PasswordUser } from '../db';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(PasswordUser.tableName, {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User.tableName,
          key: 'id',
        },
        primaryKey: true
      },
      pwdHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(PasswordUser.tableName)
  },
};
