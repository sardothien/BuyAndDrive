import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CarService } from '../services/car.service';
import { Car } from '../models/car.model';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  public newCar: FormGroup;
  public file !: File;

  constructor(private carService: CarService, private formBuilder: FormBuilder) {
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
      numberOfDoors: ['', [Validators.required, Validators.min(0)]],
      numberOfSeats: ['', [Validators.required, Validators.min(0)]],
      bootCapacity: ['', [Validators.required, Validators.min(0)]],
      AC: [false,[]],
      body: ['', [Validators.required]],
      color: ['', [Validators.required]],
      damage: ['', [Validators.required]],
      registeredUntil: ['', [Validators.required]],
      country: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      images: this.formBuilder.array([this.formBuilder.control('')])
    });
  }

  get images(){
    return this.newCar.get('images') as FormArray;
  }

  public add(car: any){
    console.log(car);
    this.carService.postCar(car).
      subscribe((c: any) => {
        console.log(c);
        window.alert(c.msg);
      });
  };

  createItem(data: any): FormGroup {
    return this.formBuilder.group(data);
  }

  onChange(event:any) {
    let files = event.target.files;
    if (files) {
      this.images.clear();
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.images.push(this.createItem({
            file,
            url: e.target.result
          }));
        }
        reader.readAsDataURL(file);
      }
    }
  }

  ngOnInit(): void {
  }

}
