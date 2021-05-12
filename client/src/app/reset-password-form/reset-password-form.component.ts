import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';
import { ResetPasswordFormInfo } from '../models/reset-password-form.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.css']
})
export class ResetPasswordFormComponent implements OnInit {

  public resetPasswordForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatPassword: ['', [Validators.required]]
    })
  }

  private getToken(): string {
    const token = this.route.snapshot.paramMap.get('token');
    return (token ? token : '');
  }

  public onSubmit(value: ResetPasswordFormInfo): void {
    if (value.password != value.repeatPassword){
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Pasword and repeat password do not match!'
      });
      return;
    }

    console.log('token: ', this.getToken());
    console.log(this.resetPasswordForm.value);

    const forSending = {
      token: this.getToken(),
      password: value.password,
      repeatPassword: value.repeatPassword
    };

    this.resetPasswordService.createResetPasswordFormRequest(forSending)
    .subscribe((response)=>{
      Swal.fire({
        icon: 'success',
        title: `Success!`,
        text: `Password reset succesful!`
      });
    },
    (err)=>{
      console.log(err);
      console.log(err.status);
      Swal.fire({
        icon: 'error',
        title: `Request Failed!`,
        text: 'Some error occured. Please try again later!'
      });
    })
  }

  ngOnInit(): void {
    const token = this.getToken();
    this.resetPasswordService.createVerifyRequest({token})
    .subscribe((res)=>{
    },
    (err)=>{
      console.log(err);
      console.log(err.status);
      this.router.navigate(['/link_expired'])
    })
  }

}
