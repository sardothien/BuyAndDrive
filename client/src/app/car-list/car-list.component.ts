import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  public cars!: Car[];
  public searchFilters: FormGroup;

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              private sanitizer: DomSanitizer) {

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
    });
   }
  
  public getImgsPath(id): Promise<string[]>{
    return this.carService.getCarImages(id).toPromise();
  }

  public async search(filters: object){
    this.carService.getCars(filters).subscribe(async cars => {
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
  };

  ngOnInit(): void {
  }

}
