import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import Swal from 'sweetalert2';

interface RejectCar {
  reason: string;
}

@Component({
  selector: 'app-approve-cars',
  templateUrl: './approve-cars.component.html',
  styleUrls: ['./approve-cars.component.css']
})
export class ApproveCarsComponent implements OnInit {

  public cars!: Observable<Car[]>;
  public rejectCarForm: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder) {

    this.cars = this.carService.getNotApprovedCars();
    this.rejectCarForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  public approve(carId: string) {
    this.carService.patchApproveCarById(carId).subscribe(
      (c: any) => {
        Swal.fire({
          icon: 'success',
          title: `Success!`,
          text: `Car approved and is visible for everyone!`
        }).then(function() {
          window.location.reload();
        });
    });
  }

  public reject(carId: string) {

    if(!this.rejectCarForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Reason Missing!',
        text: 'You must write a reason for rejection.'
      });
      return;
    }
    else {
      const data = this.rejectCarForm.value as RejectCar;
      this.carService.deleteRejectCarById(carId, data.reason).subscribe(
        (c: any) => {
          Swal.fire({
            icon: 'success',
            title: `Success!`,
            text: `Car rejected and removed from database!`
          }).then(function() {
            window.location.reload();
          });
      });
    }
  }

  ngOnInit(): void {
  }
}
