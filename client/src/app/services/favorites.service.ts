import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private cars: Car[] = [];

  constructor() { }

  public addToFavorites(car: Car){
    if (!this.cars.includes(car)){
      this.cars.push(car);
    }
  }

  public deleteFromFavorites(car: Car){
    const index = this.cars.indexOf(car, 0);
    if (index > -1) {
       this.cars.splice(index, 1);
    }
  }

  public getFavorites(): Car[]{
    return this.cars;
  }
}
