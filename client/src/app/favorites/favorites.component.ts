import { Component, OnInit } from '@angular/core';
import { Car } from '../models/car.model';
import { FavoritesService } from '../services/favorites.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  public favorites: Car[];

  constructor(private favoritesService: FavoritesService) { 
    this.favorites = this.favoritesService.getFavorites();
  }

  public deleteFromFavorites(car: Car){
    this.favoritesService.deleteFromFavorites(car).subscribe((r:any) => {
      console.log(r);
      window.alert(r.msg)
    });
  }

  ngOnInit(): void {
  }

}
