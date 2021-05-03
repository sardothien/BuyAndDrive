import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars!: Observable<Car[]>;
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  public getCars(filters: object): Observable<Car[]>{
    let query = "/filter_cars?";
    for (const [key, value] of Object.entries(filters)){
      if (value)
        query += key + "=" + encodeURIComponent(value) + "&";
    }
    query = query.substring(0, query.length - 1);
    this.cars = this.http.get<Car[]>(this.url+query);
    return this.cars;
  }

  public getCarById(id: string | null): Observable<Car[]>{
    let query = "/filter_cars?id=" + id;
    return this.http.get<Car[]>(this.url+query);
  }

  public postCar(data: any){
    return this.http.post<Car>(this.url + "/new_car", data);
  }

  public getNotApprovedCars(): Observable<Car[]> {
    this.cars = this.http.get<Car[]>(this.url + "/approve_cars");
    return this.cars;
  }

  public patchApproveCarById(carId: string) {
    return this.http.patch<Car[]>(this.url + "/approve_cars/" + carId, null);
  }
}
