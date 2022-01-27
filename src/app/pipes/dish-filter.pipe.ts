import { Pipe, PipeTransform } from '@angular/core';
import {Dish} from "../dishes-data/Dish";

@Pipe({
  name: 'dishFilter',
  pure: false
})
export class DishFilterPipe implements PipeTransform {

  transform(dishes: Dish[], categories: string[], cusines: string[], rating : string[], price : string[]  ): Dish[] {
    return dishes.filter(dish => {
      if (categories.length > 0 && dish.categories.every(category => {
        return categories.indexOf(category) === -1;
      })) {
        return false;
      }
      if (cusines.length > 0 && cusines.indexOf(dish.cusine) === -1) {
        return false;
      }
      if (rating.length > 0) {

        for(let i=0; i<rating.length; i++){
          if(dish.rate == parseInt(rating[i]) || (dish.rate> parseInt(rating[i]) && dish.rate< parseInt(rating[i])+1)){
            return true;
          }
        }return false;
      }
      if(parseInt(dish.price.slice(1))<parseInt(price[0])){

        return false;
      }
      if(parseInt(dish.price.slice(1))>parseInt(price[1])){
        return false;
      }

      return true;
    });

  }
}
