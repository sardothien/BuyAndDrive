import Joi from 'joi';
import { CarBody, CarColor, CarDamage, CarEmissionClass, CarFuelType, CarTransmission, CarType } from '../../../db/models';

export interface NewCarBodyType {
  userId: string;
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

// TODO - refactor
export const NewCarBodySchema = Joi.object({
  userId: Joi.string().required(),
  datePosted: Joi.date().required(),
  type: Joi.string().valid('New', 'Used').required(),
  make: Joi.string().required(),
  model: Joi.string().required(),
  year: Joi.number().integer().min(1900).max(2021).required(),
  mileage: Joi.number().min(0).required(),
  engineSize: Joi.number().required(),
  fuelType: Joi.string().valid('TNG', 'CNG', 'Diesel', 'Petrol', 'Electric', 'Hybrid').required(),
  emissionClass: Joi.string().valid('Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6').required(),
  horsepower: Joi.number().integer().min(0).required(),
  transmission: Joi.string().valid('Manual', 'Automatic', 'CVT').required(),
  numberOfDoors: Joi.number().integer().min(3).max(5).required(),
  numberOfSeats: Joi.number().integer().min(0).required(),
  bootCapacity: Joi.number().min(0).required(),
  AC: Joi.boolean().required(),
  body: Joi.string()
           .valid('Sedan', 'Coupe', 'Sports car', 'Station wagon', 'Hatchback', 
                  'Convertible', 'SUV', 'Minivan', 'Pickup truck')
           .required(),
  color: Joi.string().valid('Black', 'Gray', 'White', 'Red', 'Blue', 'Green').required(),
  damage: Joi.string().valid('Not Damaged', 'Damaged - Drivable', 'Damaged - Non-Drivable').required(),
  registeredUntil: Date,
  country: Joi.string().required(),
  price: Joi.number().min(0).required(),
  images: Joi.array().items(Joi.string()).required(),
});
