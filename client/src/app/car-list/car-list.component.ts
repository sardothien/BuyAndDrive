import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public cars!: Observable<Car[]>;
  public searchFilters: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder) {
    
    this.searchFilters = this.formBuilder.group({
      model: ['', []],
      price_from: ['', []],
      price_to: ['', []],
      type: ['', []],
      year_from: ['', []],
      year_to: ['', []],
      mileage_from: ['', []],
      mileage_to: ['', []],
      engineSize_from: ['', []],
      engineSize_to: ['', []],
      fuelType: ['', []],
      emissionClass: ['', []],
      horsepower_from: ['', []],
      horsepower_to: ['', []],
      transmission: ['', []],
      make: ['', []],
      country: ['', []],
      numberOfSeats_from: ['', []],
      numberOfSeats_to: ['', []],
      numberOfDoors_from: ['', []],
      numberOfDoors_to: ['', []],
      bootCapacity_from: ['', []],
      bootCapacity_to: ['', []],
      body: ['', []],
      color: ['', []],
      damage: ['', []]
    })
   }
  
  public search(filters: object){
    console.log(filters);
    this.cars = this.carService.getCars(filters);
  };

  ngOnInit(): void {
  }

}
