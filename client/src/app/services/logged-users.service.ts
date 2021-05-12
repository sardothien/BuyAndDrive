import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {
  
  private users !: [number];

  constructor() { 
    this.users = [1];
    this.users.pop();
  }

  public add_user(jwt_key: number): void {
    console.log("Ovde pucam!");
    this.users.push(jwt_key);
  }

}
