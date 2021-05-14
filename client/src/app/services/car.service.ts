import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoggedUsersService } from './logged-users.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private cars!: Observable<Car[]>;
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient, private loggedUser: LoggedUsersService) {
  }

  public authHeader(){
    let t : number = this.loggedUser.get_token();
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `${t}`)
    }
  }

  public getCars(filters: object): Observable<Car[]>{
    let query = "/filter_cars?";
    for (const [key, value] of Object.entries(filters)){
      if (value)
        query += key + "=" + encodeURIComponent(value) + "&";
    }
    query = query.substring(0, query.length - 1);
    let header = this.authHeader();
    this.cars = this.http.get<Car[]>(this.url+query, header);
    return this.cars;
  }

  public getCarById(id: string | null): Observable<Car[]>{
    let query = "/filter_cars?id=" + id;
    let header = this.authHeader();
    return this.http.get<Car[]>(this.url+query, header);
  }

  public postCar(data: any){
    let header = this.authHeader();
    return this.http.post<Car>(this.url + "/new_car", data, header);
  }

  public getNotApprovedCars(): Observable<Car[]> {
    this.cars = this.http.get<Car[]>(this.url + "/approve_cars");
    return this.cars;
  }

  public patchApproveCarById(carId: string) {
    return this.http.patch<Car>(this.url + "/approve_cars/" + carId, null);
  }

  public deleteRejectCarById(carId: string, reason: string) {
    return this.http.delete<Car>(this.url + "/reject_cars/" + carId + "/" + reason);
  }

  public getMyCars(): Observable<Car[]> {
    let header = this.authHeader();
    return this.http.get<Car[]>(this.url + "/users_cars", header);
  }
}
