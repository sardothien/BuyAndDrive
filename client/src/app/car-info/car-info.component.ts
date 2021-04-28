import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import { Observable, async } from 'rxjs';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  public car!: Car;
  public index: number = 0;

  constructor(private carService: CarService, 
              private route: ActivatedRoute,
              private favoritesService: FavoritesService) { 
  };

  private findById(): Promise<Car[]>{
    let id: string | null = "";
    this.route.paramMap.subscribe(params =>{
      id = params.get('carId');
    });
    return this.carService.getCarById(id).toPromise();
  }

  public nextImg(){
    this.index = (this.index + 1) % this.car.images.length;
  }

  async ngOnInit() {
    let c = await this.findById();
    this.car = c[0];
  }

  public addToFavorites(){
    //this.favoritesService.addToFavorites(this.car);
  }
}
