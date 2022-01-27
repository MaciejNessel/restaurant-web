import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyManageService {
  currency: string = "USD";
  USDtoEUR = 0.89;

  currencyChange() {
    if (this.currency == "USD") {
      this.currency = "EUR";
    } else {
      this.currency = "USD";
    }
  }

  getActualCurrency(){
    return this.currency;
  }

  getActualCurrencySymbol(){
    if (this.currency == "USD") {
      return "$";
    } else {
      return "€";
    }
  }

  getValueInUSD(price : number){
    if(this.currency == "EUR"){
      price /= this.USDtoEUR;
    }
    return price;

  }

  constructor() { }

}
