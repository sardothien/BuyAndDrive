import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html',
  styleUrls: ['./new-car.component.css']
})
export class NewCarComponent implements OnInit {

  public newCar: FormGroup;
  constructor(private carService: CarService, private formBuilder: FormBuilder) { 
    this.newCar = this.formBuilder.group({

    });
  }

  public add(car: object){

  };

  ngOnInit(): void {
  }

}
