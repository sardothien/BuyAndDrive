import Joi from "joi";

export const JoiName = Joi.string().min(1).max(100).required();

export const JoiEmail = Joi.string().email().required();

export const JoiPassword = Joi.string().min(1).max(20).required();

export const JoiCarYear = Joi.number().integer().min(1900).max(2021).required();
export const JoiCarType = Joi.string().valid('New', 'Used').required();
export const JoiFuelType = Joi.string().valid('TNG', 'CNG', 'Diesel', 'Petrol', 'Electric', 'Hybrid').required();
export const JoiEmissionClass = Joi.string().valid('Euro 1', 'Euro 2', 'Euro 3', 'Euro 4', 'Euro 5', 'Euro 6').required();
export const JoiTransmission = Joi.string().valid('Manual', 'Automatic', 'CVT').required();
export const JoiCarBody = Joi.string()
        .valid('Sedan', 'Coupe', 'Sports car', 'Station wagon', 'Hatchback', 
               'Convertible', 'SUV', 'Minivan', 'Pickup truck')
        .required();
export const JoiCarColor = Joi.string().valid('Black', 'Gray', 'White', 'Red', 'Blue', 'Green').required();
export const JoiCarDamage = Joi.string().valid('Not Damaged', 'Damaged - Drivable', 'Damaged - Non-Drivable').required();
export const JoiDate = Joi.date().required();
export const JoiString = Joi.string().required();