export enum CarType {
    New = 'New',
    Used = 'Used'
  };
  
  export enum CarFuelType {
    TNG = 'TNG',
    CNG = 'CNG',
    Diesel = 'Diesel',
    Petrol = 'Petrol',
    Electric = 'Electric',
    Hybrid = 'Hybrid'
  };
  
  export enum CarEmissionClass {
    Euro1 = 'Euro 1', 
    Euro2 = 'Euro 2',
    Euro3 = 'Euro 3', 
    Euro4 = 'Euro 4', 
    Euro5 = 'Euro 5',
    Euro6 = 'Euro 6'
  };
  
  export enum CarTransmission {
    Manual = 'Manual', 
    Automatic = 'Automatic',
    CVT = 'CVT'
  };
  
  export enum CarBody {
    Sedan = 'Sedan', 
    Coupe = 'Coupe', 
    SportsCar = 'Sports car', 
    StationWagon = 'Station wagon', 
    Hatchback = 'Hatchback', 
    Convertible = 'Convertible', 
    SUV = 'SUV', 
    Minivan = 'Minivan', 
    PickupTruck = 'Pickup truck'
  };
  
  export enum CarColor {
    Black = 'Black', 
    Gray = 'Gray', 
    White = 'White', 
    Red = 'Red', 
    Blue = 'Blue', 
    Green = 'Green'
  };
  
  export enum CarDamage {
    NotDamaged = 'Not Damaged', 
    DamagedDrivable = 'Damaged - Drivable', 
    DamagedNonDrivable = 'Damaged - Non-Drivable'
  };
  

export interface Car {
    id: string;
    userId: string;
    approved: boolean;
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