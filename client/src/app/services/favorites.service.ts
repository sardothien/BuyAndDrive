import { Injectable } from '@angular/core';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoggedUsersService } from './logged-users.service';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler } from '../models/error-handler-model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService extends HttpErrorHandler {
  
  private cars: Car[] = [];
  private readonly url = 'http://localhost:8080';

  constructor(private http: HttpClient, 
              private loggedUser: LoggedUsersService,
              router: Router) {
    super(router);
  }

  public authHeader(){
    let t = this.loggedUser.get_token();
    return {
      headers: new HttpHeaders()
        .set('Authorization',  `${t}`)
    }
  }

  public addToFavorites(car: Car){
    let header = this.authHeader();
    let user = this.loggedUser.get_userId();
    let data = {carId: car.id, userId: user};
    return this.http.post(this.url + "/add_favourite", data, header)
           .pipe(catchError(super.handleError()));
  }

  public deleteFromFavorites(car: Car){
    const index = this.cars.indexOf(car, 0);
    if (index > -1) {
       this.cars.splice(index, 1);
    }
    let user = this.loggedUser.get_userId();
    let header = this.authHeader();
    return this.http.delete(this.url + "/remove_favourite/" + car.id + "/" + user, header)
           .pipe(catchError(super.handleError()));
  }

  public getFavorites(){
    let header = this.authHeader();
    return this.http.get(this.url+"/favourites", header)
           .pipe(catchError(super.handleError()));
  }
}
