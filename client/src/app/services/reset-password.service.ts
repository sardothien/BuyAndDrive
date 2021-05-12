import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Response} from '../models/register.response.model';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  constructor(private http: HttpClient) { }

  createResetPasswordEmailFormRequest(body: any): Observable<Response>{
    const url = `${environment.backendUrl}/reset_password`;
    return this.http.post<Response>(url, body);
  }

  createResetPasswordFormRequest(body: any): Observable<Response>{
    const url = `${environment.backendUrl}/submit_reset_password`;
    return this.http.post<Response>(url, body);
  }

  createVerifyRequest(body: any): Observable<Response>{
    const url = `${environment.backendUrl}/verify_reset_password`;
    return this.http.post<Response>(url, body);
  }
}
