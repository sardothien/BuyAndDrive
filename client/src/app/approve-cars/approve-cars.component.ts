import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  public reasonNotEmpty: boolean = false;

  @ViewChild('inputReason', { static: false })
  private inputReason!: ElementRef;

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

  public reject(carId: string) {
    const reason: string = (this.inputReason.nativeElement as HTMLInputElement).value;

    if(!reason) {
      this.reasonNotEmpty = true;
      return;
    }
    else {
      this.carService.deleteRejectCarById(carId, reason).subscribe(
        (c: any) => {
          console.log(c);
          window.alert(c.msg);
          window.location.reload();
      });
    }
  }

  ngOnInit(): void {
  }
}
