import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Dish} from "../dishes-data/Dish";
import {DishesService} from "../services/dishes.service";
import {CurrencyManageService} from "../services/currency-manage.service";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-dishes-menager',
  templateUrl: './dishes-menager.component.html',
  styleUrls: ['./dishes-menager.component.css']
})
export class DishesMenagerComponent implements OnInit {
  dishes : Dish[] = []
  constructor(public router: Router, public dishesService : DishesService, public currencyManage: CurrencyManageService,
              public authService: AuthService) {
    this.dishes = dishesService.dishesList;
    console.log(this.dishes)
  }

  ngOnInit(): void {
  }

  add(){
    this.router.navigate(['/add'])
  }

  del(dish : Dish) {
      this.dishesService.deleteDish(dish);
  }
  change(dish : Dish){
    this.router.navigate(["menu/"+dish.id+"/change"]).then();
  }



}
