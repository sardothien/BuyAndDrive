import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarListComponent } from './car-list/car-list.component';
import { CarInfoComponent } from './car-info/car-info.component';

const routes: Routes = [
  { path: '', component: CarListComponent },
  { path: 'car/:carId', component: CarInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
