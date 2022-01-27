import {Component, OnInit} from '@angular/core';
import {DishesService} from "../services/dishes.service";
import {Dish} from "../dishes-data/Dish";


@Component({
  selector: 'app-dishes-view',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  math = Math;
  constructor(public dishesService : DishesService){
  }


  ngOnInit(): void {
    this.dishesService.updateMinMaxValue();
  }


}
