import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {
  
  private token !: number;
  private userId !: string;

  constructor() { 
  }

  public add_user(jwt_key: number, user: string): void {
    localStorage.setItem("token", `${jwt_key}`);
    localStorage.setItem("userId", user);
    this.token = jwt_key;
    this.userId = user;
  }

  public get_userId(){
    return localStorage.getItem("userId");
    return this.userId;
  }

  public get_token(){
    return localStorage.getItem("token");
    return this.token;
  }

}
