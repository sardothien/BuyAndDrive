import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public cars: Car[] = [];
  public searchFilters: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder) {
    this.cars = this.carService.getCars();
    this.searchFilters = this.formBuilder.group({
      searchText: ['', []]
    })
   }

   public search(data: any){
     console.log(data);
   }

  ngOnInit(): void {
  }

}
