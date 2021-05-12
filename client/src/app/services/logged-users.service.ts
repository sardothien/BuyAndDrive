import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUsersService {
  
  private users !: [number]

  constructor() { }

  public add_user(jwt_key: number): void {
    this.users.push(jwt_key);
  }

}
