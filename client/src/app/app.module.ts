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
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ResetPasswordEmailFormComponent } from './reset-password-email-form/reset-password-email-form.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { NewCarComponent } from './new-car/new-car.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    CarInfoComponent,
    NavigationComponent,
    FavoritesComponent,
    SearchFilterPipe,
    SignupFormComponent,
    LoginFormComponent,
    ResetPasswordEmailFormComponent,
    ResetPasswordFormComponent,
    NewCarComponent
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
              'Google-Client-ID'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
