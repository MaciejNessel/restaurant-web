import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DishesService} from "../../services/dishes.service";
import {Dish} from "../../dishes-data/Dish";
import {CurrencyManageService} from "../../services/currency-manage.service";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Review} from "../../dishes-data/Review";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";

@Component({
  selector: 'app-dish-details',
  templateUrl: './dish-details.component.html',
  styleUrls: ['./dish-details.component.css']
})
export class DishDetailsComponent implements OnInit {
  id!: number;
  dish!: Dish;
  form!: FormGroup;
  submitted = false;
  orders : number;
  isVisible : boolean
  reviews: any[] = [];
  canRate: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, public dishesService : DishesService, public currencyManage : CurrencyManageService,
              private formBuilder: FormBuilder, public cartService : CartService, public authService : AuthService, public db : AngularFirestore) {
    this.id = this.route.snapshot.params['id'];

    this.dishesService.getDish(this.id.toString()).then(r=> {
      if(r == null){
        this.router.navigate(["/**"]);
        return;
      }
      // @ts-ignore
      this.dish =r; this.dish.id = this.id;});
    this.orders = this.cartService.getQuantity(this.id.toString());
    // @ts-ignore
    this.isVisible = authService.isBought() && !authService.isMenager() && !authService.isAdmin() && authService.userData?.ban!=true;
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', [Validators.required,]],
      review: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      purchaseDate: ['', []]
    });

    this.db.collection("dishes/"+this.id+"/reviews").snapshotChanges().pipe(map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.data()})
      ))).subscribe(data => {
      this.reviews = data;
    });
    this.canRateCheck()

    // @ts-ignore
    this.canAddReview(this.authService.userLogged?.uid, this.id)
  }

  canAddReview(userID : string, dishID : string){
    this.db.collection("users/" + userID+ "/orders").snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        data: c.payload.doc.data()
      })
    ))).subscribe( x => {
      // @ts-ignore
      this.check(x, dishID);
    });
  }

  check(data : any[], dishID: string){
    for(let i = 0; i < data.length; i++){
      let actual = data[i].data.dishes;
      for(let j = 0; j<actual.length; j++){
        if(actual[j].id == dishID){
          this.isVisible = true
          return
        }
      }
    }
    this.isVisible = false
  }


  getRatingCnt() {
    return this.dish!.rate_counter;
  }
  getRating(){
    if (this.dish!.rate<0){
      return "?";
    }
    return this.dish!.rate;
  }


  changed($event: number) {

    if (this.dish!.rate < 0) {
      this.dish!.rate = 0;
    }


    this.db.collection("dishes/" + this.dish.id + "/usersrate").snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        data: c.payload.doc.data()
      })
    ))).subscribe(async x => {
      if(x.length==0){
        this.add($event);
      }
      for(let i =0; i<x.length; i++){
        // @ts-ignore
        if (this.authService.userLogged?.uid == x[i].data.idc) {
          break;
        }
        if(i==x.length-1){
          this.add($event);
        }
    }});
  }

  add($event : number){
    this.dish!.rate_counter += 1;
    this.dish!.rate = ((this.dish!.rate * (this.dish!.rate_counter - 1) + $event) / this.dish!.rate_counter);
    this.dish!.rate = parseFloat(this.dish!.rate.toFixed(2));
    this.db.collection("dishes").doc(this.dish.id).update(this.dish)
      .then(() => {
        alert("Ocena została dodana")
      });
    this.db.collection('dishes/' + this.id + '/usersrate').add({
      idc: this.authService.userLogged?.uid,
      rate: $event
      })
      .then(() => {
      })
      .catch((error) => {
        console.error("Error, no added", error);
      });
  }

  get newReview(){
    console.log(this.authService.userData)
    return {
      nick: this.authService.dataUser.first_name,
      name: this.form.value.name,
      review: this.form.value.review,
      purchaseDate: this.form.value.purchaseDate,
    };
  }
  submit() {
    this.submitted = true;
    if (this.form.invalid){
      return;
    } else{
      //this.reviews.push(this.newReview);


      this.db.collection('dishes/' + this.id + '/reviews').add(this.newReview)
        .then(() => {
          alert("Recenzja została dodana")
          this.form.reset();
          this.submitted=false;

        })
        .catch((error) => {
          console.error("Error, no added", error);
        });



    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  dishChange(){
    this.router.navigate(['change'], {relativeTo: this.route});
  }

  addOrder() {
    this.orders++;
    this.cartService.addOrder(this.dish);
  }

  removeOrder() {
    this.orders--;
    this.cartService.removeOrder(this.dish);
  }
  get availability(): string {
    // @ts-ignore
    let count = this.dish.max_orders - this.orders;
    if (count > 3) {
      return "normal";
    } else if (count > 0) {
      return "low";
    } else {
      return "none";
    }
  }

  canRateCheck() {
    this.db.collection("dishes/" + this.id + "/usersrate").snapshotChanges().pipe(map(changes => changes.map(c => ({
        id: c.payload.doc.id,
        data: c.payload.doc.data()
      })
    ))).subscribe(async x => {

      for (let i = 0; i < x.length; i++) {
        // @ts-ignore
        if (this.authService.userLogged?.uid == x[i].data.idc) {
          // @ts-ignore
          this.update(x[i].data.rate)
        }
      }
    });
  }
  update(N : number){
    this.canRate = [];
    for (let i = 0; i < N; i++) {
      this.canRate.push(0)
    }
  }


}
