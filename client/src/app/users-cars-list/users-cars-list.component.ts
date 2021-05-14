import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-users-cars-list',
  templateUrl: './users-cars-list.component.html',
  styleUrls: ['./users-cars-list.component.css']
})
export class UsersCarsListComponent implements OnInit {

  public cars!: Observable<Car[]>

  constructor(private carService: CarService) {
    this.cars = this.carService.getMyCars();
  }

  ngOnInit(): void {
  }

}
