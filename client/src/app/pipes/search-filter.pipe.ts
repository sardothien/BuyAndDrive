import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(cars: Car[], searchFilters: any): Car[] {
    console.log(searchFilters);
    let searchText = searchFilters.searchText.toLocaleLowerCase();
    let c = cars.filter(car => {
      return car.name.toLocaleLowerCase().includes(searchText);
    });
    console.log(c);
    return c;
  }

}
