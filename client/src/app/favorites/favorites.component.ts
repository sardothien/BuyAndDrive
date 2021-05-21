import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { FavoritesService } from '../services/favorites.service';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites!: Car[];

  constructor(
    private favoritesService: FavoritesService, 
    private carService: CarService,
    private sanitizer: DomSanitizer) {
    this.refresh();
  }

  public deleteFromFavorites(car: Car){
    this.favoritesService.deleteFromFavorites(car).subscribe(
      (r:any) => {
        Swal.fire({
          icon: 'success',
          title: `Favorite removed!`,
          text: `This car is removed from your favorites.`
        }).then(() => {
          this.refresh();
        });
    });
  }

  private getCars(): Promise<any>{
    let r: any = this.favoritesService.getFavorites().toPromise();
    return r;
  }

  private findById(id: string): Promise<Car[]>{
    return this.carService.getCarById(id).toPromise();
  }

  public async refresh(){
    this.favorites = [];
    let res:any = await this.getCars();
    console.log(res);
    for (let f of res.favourites){
      console.log(f);
      let c = await this.findById(f.carId);
      c[0].images = await this.getImgsPath(c[0].id);
      this.carService.getCarImage(c[0].images[0]).subscribe(data => {
        let objectURL = URL.createObjectURL(data);
        c[0].firstImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      })
      this.favorites.push(c[0]);
    }
  }

  public getImgsPath(id): Promise<string[]>{
    return this.carService.getCarImages(id).toPromise();
  }

  ngOnInit() {
  }

}
