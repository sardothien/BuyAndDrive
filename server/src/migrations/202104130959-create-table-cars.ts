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
      }
    })
  },
  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable(Car.tableName)
  },
};