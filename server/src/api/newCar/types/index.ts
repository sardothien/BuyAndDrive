import Joi from 'joi';
import { CarBody, CarColor, CarDamage, CarEmissionClass, CarFuelType, CarTransmission, CarType } from '../../../db/models';
import { JoiCarBody, JoiCarColor, JoiCarDamage, JoiCarType, JoiDate, JoiEmissionClass, JoiFuelType, JoiTransmission, JoiCarYear, JoiString, JoiEmail } from '../../../types';

export interface NewCarBodyType {
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
  description?: string;
}

export const NewCarBodySchema = Joi.object({
  type: JoiCarType,
  make: JoiString,
  model: JoiString,
  year: JoiCarYear,
  mileage: Joi.number().min(0.0).required(),
  engineSize: Joi.number().required(),
  fuelType: JoiFuelType,
  emissionClass: JoiEmissionClass,
  horsepower: Joi.number().integer().min(0).required(),
  transmission: JoiTransmission,
  numberOfDoors: Joi.number().integer().min(3).max(5).required(),
  numberOfSeats: Joi.number().integer().min(0).required(),
  bootCapacity: Joi.number().min(0.0).required(),
  AC: Joi.boolean().required(),
  body: JoiCarBody,
  color: JoiCarColor,
  damage: JoiCarDamage,
  registeredUntil: JoiDate,
  country: JoiString,
  price: Joi.number().min(0.0).required(),
  description: Joi.string().empty('')
});
