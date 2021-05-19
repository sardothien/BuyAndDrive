import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface ImageAttribute {
  id?: string;
  carId: string,
  imagePath: string
}

export interface ImageModel extends Model<ImageAttribute>, ImageAttribute { }
export class Image extends Model<ImageModel, ImageAttribute> {}

export type ImageStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): ImageModel;
}

export const ImageC = (sequelize: Sequelize): ImageStatic => {
  return sequelize.define(
    'Images', {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      carId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }, {
      freezeTableName: true,
      timestamps: false,
    }
  );
};