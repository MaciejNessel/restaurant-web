import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Categories} from "../dishes-data/Categories";
import {Cusines} from "../dishes-data/Cusines";
import{DishesService} from "../services/dishes.service";

@Component({
  selector: 'app-selection-bar',
  templateUrl: './selection-bar.component.html',
  styleUrls: ['./selection-bar.component.css']
})

export class SelectionBarComponent implements OnInit {
  categories = Categories;
  cusines = Cusines;
  rating = ["1","2","3","4","5"];


  onCategoriesChange(categories: string[]) {
    this.dishesService.changeCategories(categories);
    this.dishesService.updateListDishes();
  }

  onCusinesChange(cusines: string[]) {
    this.dishesService.changeCusines(cusines);
    this.dishesService.updateListDishes();
  }
  onRatingChange(rating: string[]) {
    this.dishesService.changeRating(rating);
    this.dishesService.updateListDishes();
  }
  onPriceChange(price: string[]) {
    this.dishesService.changePrice(price);
  }

  constructor(public dishesService: DishesService) { }

  ngOnInit(): void {
  }

}
