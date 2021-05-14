import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {

  @Output() log: EventEmitter<any> = new EventEmitter();

  constructor() { 
  }

  public add_user(jwt_key: number, user: string): void {
    localStorage.setItem("token", `${jwt_key}`);
    localStorage.setItem("userId", user);
    this.log.emit(true);
  }

  public get_userId(){
    return localStorage.getItem("userId");
  }

  public get_token(){
    return localStorage.getItem("token");
  }

  public logout(){
    localStorage.clear();
    this.log.emit(false);
  }

}
