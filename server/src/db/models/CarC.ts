import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CarAttributes {
  id?: string;
  userID: string;
  approved: boolean;
  datePosted: Date;
  make: string;
  model: string;
  year: number;
  mileage: number;
  engineSize: number;
  fuelType: string;
  emissionClass: string;
  horsepower: number;
  gearshift: string;
  numberOfDoors: number;
  numberOfSeats: number;
  bootCapacity: number;
  AC: boolean;
  body: string;
  color: string;
  damage: string;
  registeredUntil: Date;
  country: string;
  price: number;
}

export interface CarModel extends Model<CarAttributes>, CarAttributes {}
export class Car extends Model<CarModel, CarAttributes> {}

export type CarStatic = typeof Model & {
  new (values?: Record<string, undefined>, options?: BuildOptions): CarModel;
}

export const CarC = (sequelize: Sequelize): CarStatic => {
  return sequelize.define(
    'Cars', {
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
      approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      datePosted: {
        type: DataTypes.DATE,
        allowNull: false
      },
      make: {
        type: DataTypes.STRING,
        allowNull: false
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      mileage: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      engineSize: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      fuelType: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emissionClass: {
        type: DataTypes.STRING,
        allowNull: false
      },
      horsepower: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      gearshift: {
        type: DataTypes.STRING,
        allowNull: false
      },
      numberOfDoors: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      numberOfSeats: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      bootCapacity: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      AC: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      damage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      registeredUntil: {
        type: DataTypes.DATE,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
    }, {
      freezeTableName: true,
    }
  );
};