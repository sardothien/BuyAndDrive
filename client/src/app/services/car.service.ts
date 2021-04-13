import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars: Car[];

  constructor() { 
    this.cars = [
      new Car(101, "assets/BMW.png", "BMW 840 d xDrive Gran Coupe", 104990, "USED", 2020, 45342, 6.4, "Manual"),
      new Car(102, "assets/C3.png", "Citroen C3", 7700, "USED", 2017, 89550, 1.5, "Manual"),
      new Car(103, "assets/KIA.png", "Kia Sportage 1.6 GDI", 8250, "USED", 2012, 186000, 1.5, "Manual"),
      new Car(104, "assets/Octavia.png", "Škoda Octavia 2.0 tdi dsg", 12950, "USED", 2013, 169000, 1.98, "Manual"),
      new Car(105, "assets/Zafira.png", "Opel Zafira 2.0 NAV XENON 7s", 11490, "USED", 2017, 178679, 1.95, "Manual")
    ];
  }

  public getCars(): Car[]{
    return this.cars;
  }
}
