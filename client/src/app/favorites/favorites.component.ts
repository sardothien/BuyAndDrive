import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { FavoritesService } from '../services/favorites.service';
import { Observable } from 'rxjs';
import { CarService } from '../services/car.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites!: Car[];

  constructor(private favoritesService: FavoritesService, private carService: CarService) {
    this.refresh();
  }

  public deleteFromFavorites(car: Car){
    this.favoritesService.deleteFromFavorites(car).subscribe((r:any) => {
      console.log(r);
      window.alert(r.msg)
      this.refresh();
    });
  }

  private getCars(): Promise<any>{
    let r: any = this.favoritesService.getFavorites().toPromise();
    console.log(r);
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
      this.favorites.push(c[0]);
    }
  }

  ngOnInit() {
  }

}
