import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupFormComponent} from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResetPasswordEmailFormComponent } from './reset-password-email-form/reset-password-email-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { NewCarComponent } from './new-car/new-car.component';
import { ApproveCarsComponent } from './approve-cars/approve-cars.component';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { SignupSuccesfulComponent } from './signup-succesful/signup-succesful.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { UsersCarComponent } from './users-car/users-car.component';
import { UsersCarsListComponent } from './users-cars-list/users-cars-list.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'car/:carId', component: CarInfoComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'confirm_signup/:token', component: ConfirmSignupComponent },
  { path: 'signup_succesful', component: SignupSuccesfulComponent },
  { path: 'link_expired', component: LinkExpiredComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'reset_password', component: ResetPasswordEmailFormComponent },
  { path: 'reset_password/:token', component: ResetPasswordFormComponent },
  { path: 'new_car', component: NewCarComponent },
  { path: 'approve_cars', component: ApproveCarsComponent },
  { path: 'car-list', component: CarListComponent},
  // { path: 'users-car', component: UsersCarComponent },
  { path: 'my_cars', component: UsersCarsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
