import {Component} from '@angular/core';
import {DishesService} from "./services/dishes.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currency: string = 'USD';

  changeCurrency(currency: string) {
    this.currency = currency;
    this.dishesService.updateMinMaxValue(currency);
  }

  constructor(public dishesService: DishesService) {
  }

}
