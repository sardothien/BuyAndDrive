import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseModel } from '../models/database.model';
import { RegisterInfo } from '../models/register.model';
import { RegisterService } from '../services/register.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService) { 
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
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

      this.registerForm.reset();
    },
    (err)=>{
      console.log(err);
      console.log(err.status);


      if(err.status == 400 && err.error.error == "email taken"){
        Swal.fire({
          icon: 'error',  
          title: `Request Failed!`,
          text: 'Email is already taken!'
        });
        this.registerForm.reset();
      }

      else {
        Swal.fire({
          icon: 'error',  
          title: `Request Failed!`,
          text: 'Some error occured. Please try again later!'
        });

        this.registerForm.reset();
      }

    })
  }
}
