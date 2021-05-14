import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url = "http://localhost:8080/login"

  constructor(private http: HttpClient) { }


  createLoginRequest(body: any){
    return this.http.post(this.url, body);
  }
}
