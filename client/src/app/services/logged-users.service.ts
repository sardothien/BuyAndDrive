import { Injectable, Output, EventEmitter } from '@angular/core';
import {IsAdmin} from '../models/IsAdmin.model';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {

  @Output() log: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  public add_user(jwt_key: number, user: string, isAdmin: boolean,firstName:string,lastName:string): void {
    localStorage.setItem("token", `${jwt_key}`);
    localStorage.setItem("userId", user);
    localStorage.setItem("isAdmin", (isAdmin ? IsAdmin.TRUE : IsAdmin.FALSE));
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    this.log.emit([true, isAdmin]);
  }

  public get_userId(){
    return localStorage.getItem("userId");
  }

  public get_token(){
    return localStorage.getItem("token");
  }

  public is_admin(){
    return localStorage.getItem("isAdmin");
  }


  public logout(){
    localStorage.clear();
    this.log.emit([false, false]);
  }

}
