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
    console.log("Ovde pucam!");
    console.log(jwt_key);
    this.token = jwt_key;
    this.userId = user;
  }

  public get_userId(): string{
    return this.userId;
  }

  public get_token(): number{
    return this.token;
  }

}
