import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';
import { switchMap } from "rxjs/operators";
import { HttpEvent } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  public newCar: FormGroup;
  public files: FileList = null;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.newCar = this.formBuilder.group({
      type: ['', [Validators.required]],
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(2021)]],
      mileage: ['', [Validators.required, Validators.min(0)]],
      engineSize: ['', [Validators.required, Validators.min(0)]],
      fuelType: ['', [Validators.required]],
      emissionClass: ['', [Validators.required]],
      horsepower: ['', [Validators.required, Validators.min(0)]],
      transmission: ['', [Validators.required]],
      numberOfDoors: ['', [Validators.required, Validators.min(3), Validators.max(5)]],
      numberOfSeats: ['', [Validators.required, Validators.min(0)]],
      bootCapacity: ['', [Validators.required, Validators.min(0)]],
      AC: [false,[]],
      body: ['', [Validators.required]],
      color: ['', [Validators.required]],
      damage: ['', [Validators.required]],
      registeredUntil: ['', [Validators.required]],
      country: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  public add(car: any){

    if(!this.newCar.valid || this.files == null) {
      Swal.fire({
        icon: 'error',
        title: 'Some fields missing!',
        text: 'You must fill all required fields.'
      });
      return;
    }

    this.carService.postCar(car)
      .subscribe((c : any) => {
        Swal.fire({
          icon: 'success',
          title: `New car added!`,
          text: `You car is added and waiting for admin approval.`
        }).then(() => {
          this.router.navigate(['./']);
        });

        let id = c.msg.substring(15);
        console.log(id);
        for (let i = 0; i < this.files.length; i++) {
          const file: File = this.files.item(i);
          this.carService.putCarImage(id, file).subscribe((m : any) => {
            console.log(m);
          });
        }
      });
  };

  onChange(event:any) {
    this.files = (event.target as HTMLInputElement).files;
  }

  ngOnInit(): void {
  }

}
