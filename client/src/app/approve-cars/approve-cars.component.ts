import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-approve-cars',
  templateUrl: './approve-cars.component.html',
  styleUrls: ['./approve-cars.component.css']
})
export class ApproveCarsComponent implements OnInit {

  public cars!: Observable<Car[]>;

  constructor(private carService: CarService) {
    this.cars = this.carService.getNotApprovedCars();
  }

  public approve(carId: string) {
    this.carService.patchApproveCarById(carId).subscribe(
      (c: any) => {
        console.log(c);
        window.alert(c.msg);
        window.location.reload();
    });
  }

  // TODO - reject function

  ngOnInit(): void {
  }
}
