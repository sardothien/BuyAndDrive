import { sequelize, Car } from "../../../db";
import { CarBody, CarColor, CarDamage, CarEmissionClass, CarFuelType, CarModel, CarTransmission, CarType } from "../../../db/models";

export const insertCar = async (userId: string, datePosted: Date, type: CarType, make: string, 
                                model: string, year: number, mileage: number,
                                engineSize: number, fuelType: CarFuelType,
                                emissionClass: CarEmissionClass, horsepower: number,
                                transmission: CarTransmission, numberOfDoors: number,
                                numberOfSeats: number, bootCapacity: number, 
                                AC: boolean, body: CarBody, color: CarColor, 
                                damage: CarDamage, registeredUntil: Date, 
                                country: string, price: number, images: string[]): Promise<CarModel> => {
  

  const car = await sequelize.transaction(async (t) => {

    const car = await Car.create({
      userId: userId,
      datePosted: datePosted,
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
      price: price,
      images: images,
      approved: false
    }, { transaction: t });
  
    return car;
  });

  return car;
};