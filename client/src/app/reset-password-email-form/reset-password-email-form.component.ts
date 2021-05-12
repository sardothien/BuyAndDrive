import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResetPasswordEmailFormInfo } from '../models/reset-password-email-form.model';
import { ResetPasswordService } from '../services/reset-password.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-email-form',
  templateUrl: './reset-password-email-form.component.html',
  styleUrls: ['./reset-password-email-form.component.css']
})


export class ResetPasswordEmailFormComponent implements OnInit {

  public resetPasswordEmailForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private resetPasswordService: ResetPasswordService,
  ) {
    this.resetPasswordEmailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  ngOnInit(): void {
  }

  public onSubmit(): void {
    console.log(this.resetPasswordEmailForm.value);
    this.resetPasswordService.createResetPasswordEmailFormRequest(this.resetPasswordEmailForm.value)
      .subscribe((res) => {
        Swal.fire({
          icon: 'success',
          title: `Success!`,
          text: `Password reset request send successfuly!`
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
      }
    )
  }

}
