import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupFormComponent} from './signup-form/signup-form.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'car/:carId', component: CarInfoComponent },
  { path: 'signup', component: SignupFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
