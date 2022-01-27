import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  USDtoEUR = 0.89;
  transform(price: string, currency: string): string {
    let symbol = price[0];
    let value = parseFloat(price.slice(1));

    if (symbol == '$' && currency.toUpperCase() == 'EUR') {

      return '€' + (value * this.USDtoEUR).toFixed(2);
    } else if (symbol == '€' && currency.toUpperCase() == 'USD') {

      return '$' + (value / this.USDtoEUR).toFixed(2);
    } else {

      return price;
    }
  }

}
