import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface DatabaseMigrationAttributes {
  migration: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DatabaseMigrationModel extends Model<DatabaseMigrationAttributes>, DatabaseMigrationAttributes {}
export class DatabaseMigration extends Model<DatabaseMigrationModel, DatabaseMigrationAttributes> {}

export type DatabaseMigrationStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): DatabaseMigrationModel;
}

export const DatabaseMigrationC = (sequelize: Sequelize): DatabaseMigrationStatic => {
  return sequelize.define(
    'DatabaseMigrations', {
      migration: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    }, {
      freezeTableName: true,
    }
  );
};
