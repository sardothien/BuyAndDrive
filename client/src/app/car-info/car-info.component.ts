import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  public car!: Car;

  constructor(private carService: CarService, 
              private route: ActivatedRoute,
              private favoritesService: FavoritesService) { 
    this.route.paramMap.subscribe(params =>{
      const id = params.get('id');
      this.carService.getCars({id:id})
        .subscribe((cars: Car[]) => {
          cars.forEach(c => {
            if (c.id === id){
              this.car = c;
            }
          })
        });
    });
  };

  ngOnInit(): void {
  }

  public addToFavorites(){
    this.favoritesService.addToFavorites(this.car);
  }
}
