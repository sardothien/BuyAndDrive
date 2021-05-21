import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { CarService } from '../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoritesService } from '../services/favorites.service';
import Swal from 'sweetalert2';

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
              private favoritesService: FavoritesService,
              private router: Router) {
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
    this.favoritesService.addToFavorites(this.car).subscribe(
      (c:any) => {
        if(c.warning) {
          Swal.fire({
            icon: 'warning',
            title: `Warning!`,
            text: `This car is already in your favorites!`
          });
        }
        else if(c.msg) {
          Swal.fire({
            icon: 'success',
            title: `Success!`,
            text: `Car added to your favorites!`
          });
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: `Error!`,
          text: `Can't add not approved or sold car to favorites!`
        });
      });
  }

  public buyCar(carId: string) {
    this.carService.patchSoldCar(carId).subscribe(
      (c: any) => {
        Swal.fire({
          icon: 'success',
          title: `Success!`,
          text: `Car bought!`
        }).then(() => {
          this.router.navigate(['./']);
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: `Request Failed!`,
          text: "You can't buy your own car!"
        }).then(() => {
          this.router.navigate(['./']);
        });
      }
    );
  }
}
