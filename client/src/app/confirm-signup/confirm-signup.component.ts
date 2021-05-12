import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmSignupService } from '../services/confirmSignup.service';

@Component({
  selector: 'app-confirm-signup',
  templateUrl: './confirm-signup.component.html',
  styleUrls: ['./confirm-signup.component.css']
})
export class ConfirmSignupComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmSignupService: ConfirmSignupService
  ) { }

  private getToken(): string {
    const token = this.route.snapshot.paramMap.get('token');
    return (token ? token : '');
  }

  ngOnInit(): void {
    const token = this.getToken();
    this.confirmSignupService.createRegisterRequest({token})
    .subscribe((res)=>{
      this.router.navigate(['/signup_succesful'])
    },
    (err)=>{
      console.log(err);
      console.log(err.status);
      this.router.navigate(['/link_expired'])
    })
  }
}
