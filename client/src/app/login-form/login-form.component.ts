import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from 'src/types';
import { LoginInfo } from './LoginInfo.interface';
import { LoginService } from '../services/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LoggedUsersService } from '../services/logged-users.service';

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
    private loginService: LoginService,
    private loggedUsersService: LoggedUsersService,

    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.loggedUsersService.get_token() != null){
      this.router.navigate(['/car-list']);
    }
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

  onSubmit(data: LoginInfo): void{

    this.loginService.createLoginRequest(data)
    .subscribe(
      (res:any) => {
        this.loggedUsersService.add_user(res.token, res.user, res.isAdmin,res.firstName,res.lastName);
        this.router.navigate(['/car-list']);
      },

      (err:any) => {
        if(err.status == 400 && err.statusText == "Bad Request"){

          Swal.fire({
            icon: 'error',
            title: `Request Failed!`,
            text: 'Invalid email or password!'
          });
          return;
        }

        if(err.status == 403 && err.error.error == "user is not verified"){

          Swal.fire({
            icon: 'error',
            title: `Request Failed!`,
            text: 'Please verify your account before you log in.'
          });
          return;
        }

        Swal.fire({
          icon: 'error',
          title: `Request Failed!`,
          text: 'Some error occured. Please try again later!'
        });
      }
    )
  }
}
