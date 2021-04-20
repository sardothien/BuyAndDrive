import { Car } from "../../db";
import { CarModel, CarType, CarFuelType, CarEmissionClass, CarTransmission, CarBody, CarColor, CarDamage } from "../models";

export const getCarById = async (carId: string): Promise<CarModel|null> => {
  return await Car.findOne({
    where: { id: carId }
  });
};

export const getCarsIdByUserId = async (userId: string): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { userId: userId } 
  });

  return cars.map((car): string => { return car.id });  
};

export const getCarsIdByApproved = async (approved: boolean): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { approved: approved } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByDatePosted = async (datePosted: Date): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { datePosted: datePosted } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByMake = async (make: string): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { make: make } 
  });

  return cars.map((car): string => { return car.id });
};
export const getCarsIdByObject = async (g:any): Promise<string[]> => {
  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: g 
  });
  return cars.map((car): string => { return car.id });
};
export const getCarsIdByModel = async (model: string): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { model: model } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByYear = async (year: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { year: year } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByMileage = async (mileage: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { mileage: mileage } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByEngineSize = async (engineSize: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { engineSize: engineSize } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByHorsepower = async (horsepower: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { horsepower: horsepower } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByNumberOfSeats = async (numberOfSeats: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { numberOfSeats: numberOfSeats } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByBootCapacity= async (bootCapacity: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { bootCapacity: bootCapacity } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByAC = async (AC: boolean): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { AC: AC } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByRegisteredUntil = async (registeredUntil: Date): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { registeredUntil: registeredUntil } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByCountry = async (country: string): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { country: country } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByPrice = async (price: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { price: price } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByNumberOfDoors = async (numberOfDoors: number): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { numberOfDoors: numberOfDoors } 
  });

  return cars.map((car): string => { return car.id });
};

// *********************************************
// Getters for enum attributes (possible errors)
// *********************************************

export const getCarsIdByType = async (type: CarType): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { type: type } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByFuelType = async (fuelType: CarFuelType): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { fuelType: fuelType } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByEmissionClass = async (emissionClass: CarEmissionClass): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { emissionClass: emissionClass } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByTransmission = async (transmission: CarTransmission): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { transmission: transmission } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByBody = async (body: CarBody): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { body: body } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByColor = async (color: CarColor): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { color: color } 
  });

  return cars.map((car): string => { return car.id });
};

export const getCarsIdByDamage = async (damage: CarDamage): Promise<string[]> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { damage: damage } 
  });

  return cars.map((car): string => { return car.id });
};