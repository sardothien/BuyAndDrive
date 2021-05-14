import { Component, Input, OnInit } from '@angular/core';
import { Car, CarStatus } from '../models/car.model';

@Component({
  selector: 'app-users-car',
  templateUrl: './users-car.component.html',
  styleUrls: ['./users-car.component.css']
})
export class UsersCarComponent implements OnInit {


  @Input()
  public car!: Car;

  public carStatus!: string;
  CarStatusEnum = CarStatus;

  constructor() { }

  ngOnInit(): void {
    this.setCarStatus();
  }

  public setCarStatus(): void {
    if(!this.car.approved) {
      this.carStatus = this.CarStatusEnum.Pending;
    }
    else if(!this.car.sold) {
      this.carStatus = this.CarStatusEnum.Approved;
    }
    else {
      this.carStatus = this.CarStatusEnum.Sold;
    }
  }

}
