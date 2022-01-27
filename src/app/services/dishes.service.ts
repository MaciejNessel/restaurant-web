import { Injectable } from '@angular/core';
import { Dish } from '../dishes-data/Dish';
import {CurrencyManageService} from "./currency-manage.service";
import{DishFilterPipe} from "../pipes/dish-filter.pipe";

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

import {map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DishesService {
  private dishFilterPipe: DishFilterPipe;
  dishesList : Dish[] = [];
  public dishesSelectedList : Dish[] = [];

  private dbPath = 'dishes';
  daneRef : AngularFirestoreCollection<Dish>;

  constructor(public currencyManage : CurrencyManageService, public db : AngularFirestore) {
    this.dishFilterPipe = new DishFilterPipe();
    this.daneRef = db.collection(this.dbPath);
    this.updateDishesList();
  }

  updateDishesList(){
    this.daneRef.snapshotChanges().pipe(map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.id, ...c.payload.doc.data() })
      ))).subscribe(data => {
        this.dishesSelectedList = data;
        this.dishesList = data;
        this.changeNumberPages(this.numberOfDishesOnPage);  this.updateMinMaxValue();
        this.dishesSelectedList = this.dishFilterPipe.transform(this.dishesList, this.selectedCategories, this.selectedCusines, this.selectedRating, this.selectedPrice);});
  }

  ngOnInit(){

  }

  //use in selection-slide
  minPrice: number = 0;
  maxPrice: number = 0;

  //to pipe
  public selectedCategories: string[] = [];
  public selectedCusines: string[] = [];
  public selectedRating: string[] = [];
  public selectedPrice: string[] = [];

  private USDtoEUR = 0.89;
  private redDish : string | undefined = "";
  private greenDish : string | undefined = "";

  public actualPage = 0;
  public numberOfDishesOnPage = 5;
  public numberOfPages = Math.ceil(this.dishesSelectedList.length / this.numberOfDishesOnPage) - 1;

  prevPage(){
    this.actualPage = Math.max(this.actualPage - 1, 0);
  }

  nextPage(){
    this.actualPage = Math.min(this.actualPage + 1, this.numberOfPages);
  }

  changeNumberPages(number: Number){

    this.numberOfDishesOnPage = parseInt(number.valueOf().toString());
    this.numberOfDishesOnPage = Math.max(1, this.numberOfDishesOnPage);
    if(isNaN(this.numberOfDishesOnPage)){
      this.numberOfDishesOnPage=1;
    }
    this.numberOfPages = Math.ceil(this.dishesSelectedList.length / this.numberOfDishesOnPage) - 1;
    this.actualPage = 0;
  }

  updateListDishes(){
    this.dishesSelectedList = this.dishFilterPipe.transform(this.dishesList, this.selectedCategories, this.selectedCusines, this.selectedRating, this.selectedPrice);
    this.changeNumberPages(this.numberOfDishesOnPage);
  }

  getDishesSelectedList(){
    return this.dishesSelectedList;
  }
  getRedDish(){
    return this.redDish;
  }
  getGreenDish(){
    return this.greenDish;
  }

  //Add and delete dish
  addDish(dish: Dish) {
    this.db.collection(this.dbPath).add(dish)
      .then(() => {
        console.log("Added new dish");
      })
      .catch((error) => {
        console.error("Error, no added", error);
      });
    this.updateMinMaxValue();
    this.updateListDishes();
    this.changeNumberPages(this.numberOfDishesOnPage);

  }
  deleteDish(dish: Dish) {
    this.db.collection(this.dbPath).doc(dish.id).delete().then(() => {
      console.log("Dish successfully deleted!");
    }).catch((error) => {
      console.error("Error removing dish: ", error);
    });

    this.updateMinMaxValue();
    this.updateListDishes();
    this.changeNumberPages(this.numberOfDishesOnPage);
  }

  changeCategories(categories: string[]) {
    this.selectedCategories = categories;
    this.updateMinMaxValue();
  }
  changeCusines(cusines: string[]) {
    this.selectedCusines = cusines;
    this.updateMinMaxValue();
  }
  changeRating(rating: string[]) {
    this.selectedRating = rating;
    this.updateMinMaxValue();
  }
  changePrice(price: string[]) {
    this.selectedPrice = price;
    this.updateListDishes();
  }

  colorDish(minDish : Dish, maxDish : Dish){
    if(this.dishesList.length>0){
      this.greenDish = minDish.id;
      this.redDish = maxDish.id;
    }
  }

  updateMinMaxValue(currency : string = ""){
    let min = 10000000000;
    let max = 0;
    let minDish;
    let maxDish;
    if (this.dishFilterPipe.transform(this.dishesList, this.selectedCategories, this.selectedCusines, this.selectedRating, []).length==0){
      this.minPrice = 0;
      this.maxPrice = 0;
    }
    for (let item of this.dishFilterPipe.transform(this.dishesList, this.selectedCategories, this.selectedCusines, this.selectedRating, [])){
      let price = parseFloat(item['price'].slice(1));

      if(currency == "EUR"){
        price *= this.USDtoEUR;
      }
      if(price < min){
        min = price;
        minDish = item;
      }
      if(price > max){
        max = price;
        maxDish = item;
      }
    }
    this.minPrice = Math.max(parseInt(min.toFixed())-1, 0);
    this.maxPrice = parseInt(max.toFixed());

    if(max>parseFloat(max.toFixed())){
      this.maxPrice += 1;
    }
    // @ts-ignore
    this.colorDish(minDish, maxDish);
  }

  async getDish(id: string) {
    let docRef = this.db.collection(this.dbPath).doc(id);
    return docRef.ref.get().then((doc) => {
      if (doc.exists)
        return doc.data();
       else
        return null;
      });
  }

  updateDish(id:string, dish : Dish){
    this.db.collection(this.dbPath).doc(id).update({
      "name": dish.name,
      "cusine": dish.cusine,
      "categories": dish.categories,
      "price": "$" + dish.price,
      "ingredients": dish.ingredients,
      "max_orders": dish.max_orders,
      "image_src": dish.image_src,
      "image_src_optional": dish.image_src_optional,
      "description": dish.description
    })
      .then(() => {
        console.log("Document successfully updated!");
      });
  }

  getMinMaxPrice(){
    return [this.minPrice, this.minPrice];
  }



}
