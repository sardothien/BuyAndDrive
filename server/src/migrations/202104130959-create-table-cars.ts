import { QueryInterface, DataTypes } from 'sequelize';
import { User, Car } from '../db';

export = {
  up: async (query: QueryInterface): Promise<void> => {
    return query.createTable(Car.tableName, {   
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
        }
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
        type: DataTypes.FLOAT,
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
        type: DataTypes.FLOAT,
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
        type: DataTypes.FLOAT,
        allowNull: false
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      },
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Car.tableName)
  },
};
