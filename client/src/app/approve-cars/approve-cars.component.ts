import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

interface RejectCar {
  reason: string;
}

@Component({
  selector: 'app-approve-cars',
  templateUrl: './approve-cars.component.html',
  styleUrls: ['./approve-cars.component.css']
})
export class ApproveCarsComponent implements OnInit {

  public cars!: Car[];
  public rejectCarForm: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) {

    this.carService.getNotApprovedCars().subscribe(async cars => {
      this.cars = cars;
      for(let c of this.cars){
        c.images = await this.getImgsPath(c.id);
        console.log(c.images[0])
        this.carService.getCarImage(c.images[0]).subscribe(data => {
          let objectURL = URL.createObjectURL(data);
          c.firstImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
        console.log(c.firstImage)
      }
    });
    this.rejectCarForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  public getImgsPath(id): Promise<string[]>{
    return this.carService.getCarImages(id).toPromise();
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
