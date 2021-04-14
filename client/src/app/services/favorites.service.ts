import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private cars: Car[] = [];

  constructor() { }

  public addToFavorites(car: Car){
    this.cars.push(car);
  }

  public getFavorites(): Car[]{
    return this.cars;
  }
}
