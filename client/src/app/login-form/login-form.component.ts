import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/types';

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
    private httpClient: HttpClient
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
    console.log(environment.googleId);
    console.log(this.loginForm.value);
  }
}
