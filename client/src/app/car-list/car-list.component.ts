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
      price_from: [0, []],
      price_to: [Number.POSITIVE_INFINITY, []],
      type: ['Polovna i nova vozila', []]
    })
   }
  
  public search(filters: object){
    console.log(filters);
    this.cars = this.carService.getCars(filters);
  };

  ngOnInit(): void {
  }

}
