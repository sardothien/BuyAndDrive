import { Component, OnInit } from '@angular/core';
import { LoggedUsersService } from '../services/logged-users.service';
import { Router } from '@angular/router';
import {IsAdmin} from '../models/IsAdmin.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  logIn = false;
  isAdmin = false;
  fullName = "";
  constructor(private logged: LoggedUsersService, private router: Router) {
    if (this.logged.get_token() != null){
      this.logIn = true;
    }

    if(this.logged.is_admin() != null){
      this.isAdmin = this.logged.is_admin() == IsAdmin.TRUE;
    }

   }

  ngOnInit(): void {
    this.logged.log.subscribe(login_is_admin => {
      this.logIn = login_is_admin[0];
      this.isAdmin = login_is_admin[1];
    });

  }
  public getFullName() {
    return localStorage.getItem("firstName")+" "+localStorage.getItem("lastName");
  }
  public logout(){
    this.logged.logout();
    this.logIn = false;
    this.router.navigate(['/login']);
  }

}
