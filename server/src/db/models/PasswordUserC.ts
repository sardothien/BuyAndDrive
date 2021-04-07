import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface PasswordUserAttributes {
  userId: string;
  pwdHash: string;
}

export interface PasswordUserModel extends Model<PasswordUserAttributes>, PasswordUserAttributes {}
export class PasswordUser extends Model<PasswordUserModel, PasswordUserAttributes> {}

export type PasswordUserStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): PasswordUserModel;
}

export const PasswordUserC = (sequelize: Sequelize): PasswordUserStatic => {
  return sequelize.define(
    'PasswordUsers', {
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      pwdHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
    }, {
      freezeTableName: true,
      timestamps: false,
    }
  );
};
