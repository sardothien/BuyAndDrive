import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {

  @Output() log: EventEmitter<any> = new EventEmitter();

  constructor() { 
  }

  public add_user(jwt_key: number, user: string, isAdmin: boolean): void {
    localStorage.setItem("token", `${jwt_key}`);
    localStorage.setItem("userId", user);
    localStorage.setItem("isAdmin", `${isAdmin}`);
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
