import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-approve-cars',
  templateUrl: './approve-cars.component.html',
  styleUrls: ['./approve-cars.component.css']
})
export class ApproveCarsComponent implements OnInit {

  public cars!: Car[];

  constructor(private carService: CarService,
              private sanitizer: DomSanitizer) {

    this.carService.getNotApprovedCars().subscribe(async cars => {
      this.cars = cars;
      for(let c of this.cars){
        c.images = await this.getImgsPath(c.id);
        this.carService.getCarImage(c.images[0]).subscribe(data => {
          let objectURL = URL.createObjectURL(data);
          c.firstImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        })
      }
    });
  }

  public getImgsPath(id): Promise<string[]>{
    return this.carService.getCarImages(id).toPromise();
  }

  ngOnInit(): void {
  }
}
