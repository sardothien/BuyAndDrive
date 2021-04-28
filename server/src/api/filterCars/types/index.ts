import Joi from 'joi';


export const FilterCarSchema = Joi.object({
  id: Joi.string(),
  type: Joi.string().valid('New', 'Used'),
  make: Joi.string(),
  model: Joi.string(),
  year_from: Joi.number().integer().min(1900).max(2021),
  year_to: Joi.number().integer().min(1900).max(2021),
  mileage_from: Joi.number().min(0),
  mileage_to: Joi.number().min(0),
  engineSize_from: Joi.number(),
  engineSize_to: Joi.number(),
  fuelType: Joi.string().valid('TNG', 'CNG', 'Diesel', 'Petrol', 'Electric', 'Hybrid'),
  emissionClass: Joi.string().valid('Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6'),
  horsepower_from: Joi.number().integer().min(0),
  horsepower_to: Joi.number().integer().min(0),
  transmission: Joi.string().valid('Manual', 'Automatic', 'CVT'),
  numberOfDoors_from: Joi.number().integer().min(3).max(5),
  numberOfDoors_to: Joi.number().integer().min(3).max(5),
  numberOfSeats_from: Joi.number().integer().min(0),
  numberOfSeats_to: Joi.number().integer().min(0),
  bootCapacity_from: Joi.number().min(0),
  bootCapacity_to: Joi.number().min(0),
  body: Joi.string().valid('Sedan', 'Coupe', 'Sports car', 'Station wagon', 'Hatchback', 'Convertible', 'SUV', 'Minivan', 'Pickup truck'),
  color: Joi.string().valid('Black', 'Gray', 'White', 'Red', 'Blue', 'Green'),
  damage: Joi.string().valid('Not Damaged', 'Damaged - Drivable', 'Damaged - Non-Drivable'),
  country: Joi.string(),
  price_from: Joi.number().min(0),
  price_to: Joi.number().min(0),
});


