import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';

interface RejectCar {
  reason: string;
}

@Component({
  selector: 'app-approve-car',
  templateUrl: './approve-car.component.html',
  styleUrls: ['./approve-car.component.css']
})
export class ApproveCarComponent implements OnInit {

  @Input()
  public car!: Car;

  public rejectCarForm: FormGroup;
  public index: number = 0;

  constructor(private formBuilder: FormBuilder,
              private carService: CarService,
              private sanitizer: DomSanitizer) {
    this.rejectCarForm = this.formBuilder.group({
      reason: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
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

  public getImg(path){
    this.carService.getCarImage(path).subscribe(data => {
      let objectURL = URL.createObjectURL(data);
      this.car.firstImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  public nextImg(){
    this.index = (this.index + 1) % this.car.images.length;
    this.getImg(this.car.images[this.index]);
  }

}
