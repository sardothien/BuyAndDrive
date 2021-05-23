import { Car } from "../../db";
import { CarModel } from "../models";

export const getCarById = async (carId: string): Promise<CarModel|null> => {
  return await Car.findOne({
    where: { id: carId }
  });
};

export const getCarsByUserId = async (userId: string): Promise<CarModel[]> => {

  const cars = await Car.findAll({ 
    where: { userId: userId } 
  });

  return cars;
};

export const getNotApprovedCars = async (): Promise<CarModel[]> => {

  const cars = await Car.findAll({ 
    where: { approved: false } 
  });
  
  return cars;
};

export const getCarsByObject = async (g:any): Promise<CarModel[]> => {
  const cars = await Car.findAll({ 
    where: g 
  });
  return cars;
};