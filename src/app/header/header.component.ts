import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {CartService} from "../services/cart.service";
import {CurrencyManageService} from "../services/currency-manage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() onCurrencyChange = new EventEmitter;
  currency : string = "USD";
  changeCurrency() {
    this.currencyManage.currencyChange();
    if(this.currency=="USD"){
      this.currency="EUR";
    }
    else if(this.currency=="EUR"){
      this.currency="USD";
    }
    this.onCurrencyChange.emit(this.currency);
  }

  constructor(public cartService: CartService, public currencyManage: CurrencyManageService,
              private router: Router, public authService: AuthService) { }

  ngOnInit(): void {

  }

  addSelect(){
    this.router.navigate(['/dishes-menager'] );
  }
  menuSelect(){
    this.router.navigate(['/menu'] );
  }
  cartSelect(){
    this.router.navigate(['/cart'] );
  }
  mainSelect(){
    this.router.navigate(['/'] );
  }
  login(){
    this.router.navigate(['/login'] );
  }
  register(){
    this.router.navigate(['/register'] );
  }

  admin(){
    this.router.navigate(['/admin-view'] );
  }

}
