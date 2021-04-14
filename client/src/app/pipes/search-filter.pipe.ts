import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(cars: Car[], searchFilters: any): Car[] {
    console.log(searchFilters);
    let searchText = searchFilters.searchText.toLocaleLowerCase();
    let priceFrom = Number(searchFilters.priceFrom);
    let priceTo = Number(searchFilters.priceTo);
    let type = searchFilters.type;
    return cars.filter(car => {
      return car.name.toLocaleLowerCase().includes(searchText) &&
             car.price >= priceFrom && car.price <= priceTo &&
             (car.type == "Polovan" && (type == "Polovna i nova vozila" || type == "Samo polovna vozila") ||
              car.type == "Nov" && (type == "Polovna i nova vozila" || type == "Samo nova vozila"));
    });
  }

}
