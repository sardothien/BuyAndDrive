import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize';

export enum CarType {
  New = 'New',
  Used = 'Used'
};

export enum CarFuelType {
  TNG = 'TNG',
  CNG = 'CNG',
  Diesel = 'Diesel',
  Petrol = 'Petrol',
  Electric = 'Electric',
  Hybrid = 'Hybrid'
};

export enum CarEmissionClass {
  Euro1 = 'Euro 1', 
  Euro2 = 'Euro 2',
  Euro3 = 'Euro 3', 
  Euro4 = 'Euro 4', 
  Euro5 = 'Euro 5',
  Euro6 = 'Euro 6'
};

export enum CarTransmission {
  Manual = 'Manual', 
  Automatic = 'Automatic',
  CVT = 'CVT'
};

export enum CarBody {
  Sedan = 'Sedan', 
  Coupe = 'Coupe', 
  SportsCar = 'Sports car', 
  StationWagon = 'Station wagon', 
  Hatchback = 'Hatchback', 
  Convertible = 'Convertible', 
  SUV = 'SUV', 
  Minivan = 'Minivan', 
  PickupTruck = 'Pickup truck'
};

export enum CarColor {
  Black = 'Black', 
  Gray = 'Gray', 
  White = 'White', 
  Red = 'Red', 
  Blue = 'Blue', 
  Green = 'Green'
};

export enum CarDamage {
  NotDamaged = 'Not Damaged', 
  DamagedDrivable = 'Damaged - Drivable', 
  DamagedNonDrivable = 'Damaged - Non-Drivable'
};

export interface CarAttributes {
  id: string;
  userId: string;
  approved: boolean;
  datePosted: Date;
  type: CarType;
  make: string;
  model: string;
  year: number;
  mileage: number;
  engineSize: number;
  fuelType: CarFuelType;
  emissionClass: CarEmissionClass;
  horsepower: number;
  transmission: CarTransmission;
  numberOfDoors: number;
  numberOfSeats: number;
  bootCapacity: number;
  AC: boolean;
  body: CarBody;
  color: CarColor;
  damage: CarDamage;
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
        type: DataTypes.SMALLINT,
        validate: {
          min: 3,
          max: 5
        },
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