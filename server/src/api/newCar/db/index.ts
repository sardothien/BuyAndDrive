import { sequelize, Car, User } from "../../../db";
import { CarBody, CarColor, CarDamage, CarEmissionClass, CarFuelType, CarModel, CarTransmission, CarType } from "../../../db/models";
import {Image} from '../../../db'
export const insertCar = async (userId: string, type: CarType, make: string, 
                                model: string, year: number, mileage: number,
                                engineSize: number, fuelType: CarFuelType,
                                emissionClass: CarEmissionClass, horsepower: number,
                                transmission: CarTransmission, numberOfDoors: number,
                                numberOfSeats: number, bootCapacity: number, 
                                AC: boolean, body: CarBody, color: CarColor, 
                                damage: CarDamage, registeredUntil: Date, 
                                country: string, price: number): Promise<CarModel|null> => {
  

  const car = await sequelize.transaction(async (t) => {
  
    const car = await Car.create({
      userId: userId,
      type: type,
      make: make,
      model: model,
      year: year,
      mileage: mileage,
      engineSize: engineSize,
      fuelType: fuelType,
      emissionClass: emissionClass,
      horsepower: horsepower,
      transmission: transmission, 
      numberOfDoors: numberOfDoors,
      numberOfSeats: numberOfSeats,
      bootCapacity: bootCapacity,
      AC: AC,
      body: body,
      color: color,
      damage: damage,
      registeredUntil: registeredUntil,
      country: country,
      price: price
    }, { transaction: t });
  
    return car;
  });

  return car;
};
export const addImagePath = async (carId: string, imagePath:string): Promise<void> =>{
  const image = await Image.create({
    carId: carId,
    imagePath: imagePath
  });
}