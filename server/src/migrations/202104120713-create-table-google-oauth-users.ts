import { QueryInterface, DataTypes } from 'sequelize';
import { User, GoogleOauthUser } from '../db';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(GoogleOauthUser.tableName, {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: User.tableName,
          key: 'id',
        },
        
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(GoogleOauthUser.tableName)
  },
};
