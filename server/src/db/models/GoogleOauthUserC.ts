import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface GoogleOauthUserAttributes {
  id?: string;
  userId: string;
  googleId: string;
}

export interface GoogleOauthUserModel extends Model<GoogleOauthUserAttributes>, GoogleOauthUserAttributes {}
export class GoogleOauthUser extends Model<GoogleOauthUserModel, GoogleOauthUserAttributes> {}

export type GoogleOauthUserStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): GoogleOauthUserModel;
}

export const GoogleOauthUserC = (sequelize: Sequelize): GoogleOauthUserStatic => {
  return sequelize.define(
    'GoogleOauthUsers', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      freezeTableName: true,
    }
  );
};