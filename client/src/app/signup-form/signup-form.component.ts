import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RegisterInfo} from './RegisterInfo.interface';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeatPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  public submitForm(value: RegisterInfo): void {    
    if (value.password != value.repeatPassword){
      window.alert("Lozinka i ponovljena lozinka nisu iste. Pokusajte o5!");
      return;
    }

    

  }

}
