import { Car } from "../../db";
import { CarModel, CarType, CarFuelType, CarEmissionClass, CarTransmission, CarBody, CarColor, CarDamage } from "../models";

export const getCarById = async (carId: string): Promise<CarModel|null> => {
  return await Car.findOne({
    where: { id: carId }
  });
};

export const getCarsIdByUserId = async (userId: string): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { userId: userId } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByApproved = async (approved: boolean): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { approved: approved } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByDatePosted = async (datePosted: Date): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { datePosted: datePosted } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByMake = async (make: string): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { make: make } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByObject = async (g:any): Promise<string[]> => {
  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: g 
  });
  return cars.map((car): string => {
    if (car.id)
      return car.id
    else
      return "-1"
  });
};


export const getCarsIdByModel = async (model: string): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { model: model } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByYear = async (year: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { year: year } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByMileage = async (mileage: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { mileage: mileage } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByEngineSize = async (engineSize: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { engineSize: engineSize } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByHorsepower = async (horsepower: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { horsepower: horsepower } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByNumberOfSeats = async (numberOfSeats: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { numberOfSeats: numberOfSeats } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByBootCapacity= async (bootCapacity: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { bootCapacity: bootCapacity } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByAC = async (AC: boolean): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { AC: AC } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByRegisteredUntil = async (registeredUntil: Date): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { registeredUntil: registeredUntil } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByCountry = async (country: string): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { country: country } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByPrice = async (price: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { price: price } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByNumberOfDoors = async (numberOfDoors: number): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { numberOfDoors: numberOfDoors } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

// *********************************************
// Getters for enum attributes (possible errors)
// *********************************************

export const getCarsIdByType = async (type: CarType): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { type: type } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByFuelType = async (fuelType: CarFuelType): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { fuelType: fuelType } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByEmissionClass = async (emissionClass: CarEmissionClass): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { emissionClass: emissionClass } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByTransmission = async (transmission: CarTransmission): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { transmission: transmission } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByBody = async (body: CarBody): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { body: body } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByColor = async (color: CarColor): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { color: color } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};

export const getCarsIdByDamage = async (damage: CarDamage): Promise<string[] | null> => {

  const cars = await Car.findAll({ 
    attributes: ['id'],
    where: { damage: damage } 
  });

  if (!cars)
    return null;
  else
    return cars.map((car): string => { return car.id!=undefined ? car.id : "-1"; });
};
