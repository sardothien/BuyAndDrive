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
      gearshift: {
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
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Car.tableName)
  },
};
