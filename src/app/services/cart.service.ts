import { Injectable } from '@angular/core';
import {DishComponent} from "../dishes/dish/dish.component";
import {Dish} from "../dishes-data/Dish";
import {AngularFirestore} from "@angular/fire/compat/firestore";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  ordercount: number = 0;
  shoppingCartView: Dish[] = [];
  private dbPath = 'dishes';
  constructor(public db : AngularFirestore) { }

  addOrder(dish : Dish) {
    this.ordercount++;
    this.shoppingCartView.push(dish);
  }

  removeOrder(dish : Dish) {
    for(let i=0; i<this.shoppingCartView.length; i++){
      if(this.shoppingCartView[i].id===dish.id){
        this.shoppingCartView.splice(i,1);
        break;
      }
    }
    this.ordercount--;
  }

  getOrderCount() {
    return this.ordercount;
  }

  getShoppingCartView(){
    return this.getShoppingCartComponent(this.shoppingCartView);
  }

  getQuantity(id: string | undefined){
    let result = 0;
    for(let i = 0; i<this.shoppingCartView.length; i++){
      if(this.shoppingCartView[i].id == id){
        result+=1;
      }
    }
    return result;
  }

  getShoppingCartComponent(arr : any) {
    let  a = [], b = [], prev = null;


    for (let  i = 0; i < arr.length; i++) {
      let flag = false;
      for(let j=0; j<a.length; j++) {
        if (arr[i].id == a[j].id) {
          b[j] += 1;
          flag = true;
          break;
        }
      }
      if(!flag){
        a.push(arr[i]);
        b.push(1);
      }
    }
    for(let i=0; i<a.length; i++){
      a[i] = [a[i], b[i]]
    }

    return a;
  }


  checkIsAvaliableOrder(user : any){
    if(user===null){
      alert("Zaloguj się, aby złożyć zamówienie.")
      return
    }
    let dishesOnOrder = this.getShoppingCartComponent(this.shoppingCartView)
    let cnt = dishesOnOrder.length;
    dishesOnOrder.forEach((item)=>{
      this.getDish(item[0].id).then((x) => {
        // @ts-ignore
        if(x.max_orders < item[1]){
          alert("Niestety, restauracja nie jest w stanie dostarczyć wszystkich potraw z twojego koszyka")
          return
        }
        else{
          cnt -= 1
          if(cnt===0){
            this.createOrder(dishesOnOrder, user);
          }
        }
      })
    })
    }

  sumaEl(item : Dish[][]){
    let res = 0;
    for(let i =0; i<item.length; i++){
      let price = parseFloat(item[i][0].price.slice(1));
      let quantity = parseInt(item[i][1].toString());
      res += (price * quantity);
    }
    return  res.toFixed(2);
  }


  async createOrder(dishesOnOrder: any[], user: any) {

    let dishesInf :any[] = [];

    for (const x of dishesOnOrder) {
      let id = x[0].id
      let quantity = x[1]

      // @ts-ignore
      await this.getDish(id).then((x : Dish) => {
        dishesInf.push({
          id: id,
          dishName: x.name,
          quantity: quantity
        })
      })

    }
    let date = new Date().toLocaleDateString()
    let order = {
      dishes: dishesInf,
      priceAll: this.sumaEl(dishesOnOrder),
      date: date
    }

    this.db.collection('users/' + user.uid + '/orders').add(order)
      .then(() => {
        console.log("Zamowienie zostało złożone.");
        alert("Zamówienie zostało złożone.")
        this.shoppingCartView = []
        this.ordercount = 0
      })
      .catch((error) => {
        console.error("Error, no added", error);
      });
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



}

