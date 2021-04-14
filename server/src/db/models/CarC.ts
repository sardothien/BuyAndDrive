import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export interface CarAttributes {
  id: string;
  userId: string;
  approved: boolean;
  datePosted: Date;
  type: Enumerator;
  make: string;
  model: string;
  year: number;
  mileage: number;
  engineSize: number;
  fuelType: Enumerator;
  emissionClass: Enumerator;
  horsepower: number;
  transmission: Enumerator;
  numberOfDoors: Enumerator;
  numberOfSeats: number;
  bootCapacity: number;
  AC: boolean;
  body: Enumerator;
  color: Enumerator;
  damage: Enumerator;
  registeredUntil: Date;
  country: string;
  price: number;
  images: string[];
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      type: {
        type: DataTypes.ENUM,
        values: ['New', 'Used'],
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
        type: DataTypes.ENUM,
        values: ['TNG', 'CNG', 'Diesel', 'Petrol', 'Electric', 'Hybrid'],
        allowNull: false
      },
      emissionClass: {
        type: DataTypes.ENUM,
        values: ['Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'],
        allowNull: false
      },
      horsepower: {
        type: DataTypes.SMALLINT,
        allowNull: false
      },
      transmission: {
        type: DataTypes.ENUM,
        values: ['Manual', 'Automatic', 'CVT'],
        allowNull: false
      },
      numberOfDoors: {
        type: DataTypes.ENUM,
        values: ['2/3', '4/5'],
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
        type: DataTypes.ENUM,
        values: ['Sedan', 'Coupe', 'Sports car', 'Station wagon', 
                 'Hatchback', 'Convertible', 'SUV', 'Minivan', 'Pickup truck'],
        allowNull: false
      },
      color: {
        type: DataTypes.ENUM,
        values: ['Black', 'Gray', 'White', 'Red', 'Blue', 'Green'],
        allowNull: false
      },
      damage: {
        type: DataTypes.ENUM,
        values: ['Not Damaged', 'Damaged - Drivable', 'Damaged - Non-Drivable'],
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
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
    }, {
      freezeTableName: true,
    }
  );
};