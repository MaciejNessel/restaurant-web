import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs";
import {DishesService} from "../services/dishes.service";

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  id!: string;
  userData!: any
  ordersData!: any

  constructor(private router: Router, private route: ActivatedRoute, private auth : AuthService, public db : AngularFirestore, dishesService : DishesService ) {
    this.id = this.route.snapshot.params['id'];
    this.getUserData(this.id).then((x)=>{
      this.userData = x
      if(x==null){
        this.router.navigate(['user-details'])
      }
    });
    this.updateOrdersList();
  }

  ngOnInit(): void {

  }

  async getUserData(id: string) {
    let docRef = this.db.collection("users").doc(id);
    return docRef.ref.get().then((doc) => {
      if (doc.exists){
        return doc.data();}
      else
        return null;
    });
  }

  updateOrdersList(){
    this.db.collection("users/"+this.id+"/orders").snapshotChanges().pipe(map(changes =>
      changes.map(c =>
        ({ id: c.payload.doc.data()})
      ))).subscribe(data => {
        this.ordersData = data
      });
  }

}
