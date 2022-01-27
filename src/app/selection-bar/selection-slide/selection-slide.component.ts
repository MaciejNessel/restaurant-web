import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrencyManageService} from "../../services/currency-manage.service";
import {DishesService} from "../../services/dishes.service";

@Component({
  selector: 'app-selection-slide',
  templateUrl: './selection-slide.component.html',
  styleUrls: ['./selection-slide.component.css']
})
export class SelectionSlideComponent implements OnInit {

  constructor(public currencyManage: CurrencyManageService, public dishesService : DishesService) {}
  ngOnInit(): void {}

  onSliderChange(selectedValues: number[]) {
    setTimeout(() =>{
      let minPrice = this.currencyManage.getValueInUSD(selectedValues[0]);
      let maxPrice = this.currencyManage.getValueInUSD(selectedValues[1]);
      this.dishesService.changePrice([minPrice.toString(), maxPrice.toString()]);
    });
  }
}
