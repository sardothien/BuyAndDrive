import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Response} from '../models/register.response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly url = `${environment.backendUrl}/login`;

  constructor(private http: HttpClient) { }

  createLoginRequest(body: any): Observable<Response>{
    return this.http.post<Response>(this.url, body);
  }
}
