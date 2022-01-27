import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Dish } from '../../dishes-data/Dish';
import {CurrencyPipe} from 'src/app/pipes/currency.pipe';
import { CartService } from 'src/app/services/cart.service';
import {CurrencyManageService} from "../../services/currency-manage.service";
import {DishesService} from "../../services/dishes.service";

import {trigger, style, animate, transition } from '@angular/animations';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css'],
  animations: [ trigger('CardAnimation', [
                transition(':enter', [
                style({opacity: 0}),
                animate(200)])])]})

export class DishComponent implements OnInit {

  constructor(public cartService: CartService,
              public currencyManage: CurrencyManageService,
              public dishesService : DishesService,
              private router: Router, private route: ActivatedRoute, public authService: AuthService){}

  ngOnInit(): void {
    if(this.dish){
      this.orders = this.cartService.getQuantity(this.dish.id);
    }
  }

  @Input() dish!: Dish;
  orders : number = 0;

  get availability(): string {
    let count = this.dish.max_orders - this.orders;
    if (count > 3) {
      return "normal";
    } else if (count > 0) {
      return "low";
    } else {
      return "none";
    }
  }

  addOrder() {
    this.orders++;
    this.cartService.addOrder(this.dish);
  }

  removeOrder() {
    this.orders--;
    this.cartService.removeOrder(this.dish);
  }

  del() {
    if(this.authService.isMenager()){
      this.dishesService.deleteDish(this.dish);
      for(let i=0; i<this.orders; i++){
        this.cartService.removeOrder(this.dish);
      }
    }
  }

  getRating(){
    if (this.dish.rate<0){
      return "?";
    }
    return this.dish.rate;
  }

  dishView(){
    this.router.navigate([this.dish.id], {relativeTo: this.route});
  }

}
