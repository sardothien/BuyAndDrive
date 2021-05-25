import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Car, CarStatus } from '../models/car.model';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-users-car',
  templateUrl: './users-car.component.html',
  styleUrls: ['./users-car.component.css']
})
export class UsersCarComponent implements OnInit {


  @Input()
  public car!: Car;

  public carStatus!: string;
  CarStatusEnum = CarStatus;

  public index: number = 0;
  public image;

  constructor(private carService: CarService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.setCarStatus();
  }

  public setCarStatus(): void {
    if(!this.car.approved) {
      this.carStatus = this.CarStatusEnum.Pending;
    }
    else if(!this.car.sold) {
      this.carStatus = this.CarStatusEnum.Approved;
    }
    else {
      this.carStatus = this.CarStatusEnum.Sold;
    }
  }

  public getImg(path){
    this.carService.getCarImage(path).subscribe(data => {
      let objectURL = URL.createObjectURL(data);
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  public nextImg(){
    this.index = (this.index + 1) % this.car.images.length;
    console.log(this.car.images.length);
    this.getImg(this.car.images[this.index]);
  }

}
