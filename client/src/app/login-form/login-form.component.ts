import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/types';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: SocialAuthService,
    private httpClient: HttpClient,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async logInWithGoogle(): Promise<void> {
    const googleUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.httpClient.post(
      `${environment.backendUrl}/oauth/google`,
      {idToken: googleUser.idToken}
      ).subscribe(data=> {
        const res = data as LoginResponse;
        localStorage.setItem('token', res.token)
      })
  }

  onSubmit(): void{
    this.loginService.createLoginRequest(this.loginForm.value)
      .subscribe(data => {
        const res = data as unknown as LoginResponse;
        localStorage.setItem('token', res.token)

      }, err => {
        console.log(err);
        console.log(err.status);
        if(err.status == 400) {
          Swal.fire({
            icon: 'error',
            title: `Request Failed!`,
            text: err.error.error
          });
          return
        }
        Swal.fire({
          icon: 'error',
          title: `Request Failed!`,
          text: 'There has been an error on our side'
        });
      })
    }
}
