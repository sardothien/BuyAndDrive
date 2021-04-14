import { Car } from "../../db";
import { CarModel } from "../models";

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

// TODO - add more getters