import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {DishComponent} from "../dishes/dish/dish.component";
import {CurrencyPipe} from 'src/app/pipes/currency.pipe';
import {CurrencyManageService} from "../services/currency-manage.service";
import {Dish} from "../dishes-data/Dish";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})

export class ShoppingCardComponent implements OnInit {

  constructor(public cartService: CartService, public currencyManage : CurrencyManageService, public authService : AuthService) { }
  currencyPipe = new CurrencyPipe();


  ngOnInit(): void {
  }

  sumaEl(item : Dish[][]){
    let res = 0;
    for(let i =0; i<item.length; i++){
      let price = parseFloat(item[i][0].price.slice(1));
      let quantity = parseInt(item[i][1].toString());
      res += (price * quantity);
    }
    return '$' + res.toFixed(2);
  }

  order(){
    this.authService.checkIsUpdatedData().then((x)=>{
      if(x!=null){
        this.cartService.checkIsAvaliableOrder(this.authService.userLogged)
      }
      else{
        this.authService.updateDataView()
      }
    })
    }
}
