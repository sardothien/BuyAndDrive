import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarListComponent } from './car-list/car-list.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResetPasswordEmailFormComponent } from './reset-password-email-form/reset-password-email-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { NewCarComponent } from './new-car/new-car.component';
import { ApproveCarsComponent } from './approve-cars-list/approve-cars.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { environment } from 'src/environments/environment';
import { ConfirmSignupComponent } from './confirm-signup/confirm-signup.component';
import { SignupSuccesfulComponent } from './signup-succesful/signup-succesful.component';
import { LinkExpiredComponent } from './link-expired/link-expired.component';
import { UsersCarComponent } from './users-car/users-car.component';
import { UsersCarsListComponent } from './users-cars-list/users-cars-list.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ApproveCarComponent } from './approve-car/approve-car.component';


@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarInfoComponent,
    NavigationComponent,
    FavoritesComponent,
    SignupFormComponent,
    LoginFormComponent,
    ResetPasswordEmailFormComponent,
    ResetPasswordFormComponent,
    NewCarComponent,
    ApproveCarsComponent,
    ConfirmSignupComponent,
    SignupSuccesfulComponent,
    LinkExpiredComponent,
    UsersCarComponent,
    UsersCarsListComponent,
    ErrorPageComponent,
    ApproveCarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleId
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
