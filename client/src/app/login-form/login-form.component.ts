import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SocialAuthService, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.minLength(8)]],
    })
  }

  isValidInput(fieldName: string): boolean {
    return this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty || this.loginForm.controls[fieldName].touched);
  }

  async logInWithGoogle(): Promise<void> {
    const googleUser = await this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    console.log(googleUser);
  }

  onSubmit(): void{
    console.log(environment.googleId);
    console.log(this.loginForm.value);
  }
}
