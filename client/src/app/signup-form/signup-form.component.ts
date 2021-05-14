import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseModel } from '../models/database.model';
import { RegisterInfo } from '../models/register.model';
import { RegisterService } from '../services/register.service';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { LoginResponse } from 'src/types';


import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: SocialAuthService,
    private httpClient: HttpClient,
    private router: Router
  ) {
      this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  async signUpWithGoogle(): Promise<void> {
    const googleUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.httpClient.post(
      `${environment.backendUrl}/oauth/google`,
      {idToken: googleUser.idToken}
      ).subscribe(data => {
        const res = data as LoginResponse;
        localStorage.setItem('token', res.token)
      })

    console.log(googleUser);
  }

// 'success' | 'error' | 'warning' | 'info'
  public submitForm(value: RegisterInfo): void {
    if (value.password != value.repeatPassword){
      Swal.fire({
        icon: 'warning',
        title: 'Password Warning!',
        text: 'Pasword and repeat password do not match!'
      });
      return;
    }

    let databaseModel = new DatabaseModel(value);

    if(!databaseModel.lastName){
      Swal.fire({
        icon: 'warning',
        title: 'Full name Warning!',
        text: 'Enter first and last name separated by a space!'
      });
      return;
    }

    this.registerService.createRegisterRequest(databaseModel)
    .subscribe((response)=>{
      Swal.fire({
        icon: 'success',
        title: `Success!`,
        text: `User signed up successfully!`
      });

      this.signupForm.reset();
      this.router.navigate(['./login']);
    },
    (err)=>{
      
      if(err.status == 400 && err.error.error == "email taken"){
        Swal.fire({
          icon: 'error',
          title: `Request Failed!`,
          text: 'Email is already taken!'
        });
        this.signupForm.reset();
      }

      else {
        Swal.fire({
          icon: 'error',
          title: `Request Failed!`,
          text: 'Some error occured. Please try again later!'
        });

        this.signupForm.reset();
      }

    })
  }
}
