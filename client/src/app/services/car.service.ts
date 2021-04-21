import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars!: Observable<Car[]>;
  private readonly url = 'http://localhost:8080/filter_cars';

  constructor(private http: HttpClient) { 
    this.refreshCars();
  }

  private refreshCars(): Observable<Car[]>{
    this.cars = this.http.get<Car[]>(this.url);
    return this.cars;
  }

  public getCars(): Observable<Car[]>{
    return this.cars;
  }
}
