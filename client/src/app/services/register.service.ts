import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Response} from '../models/register.response.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private readonly url = `${environment.backendUrl}/signup`;

  constructor(private http: HttpClient) { }

  createRegisterRequest(body: any): Observable<Response>{
    return this.http.post<Response>(this.url, body);
  }
}
