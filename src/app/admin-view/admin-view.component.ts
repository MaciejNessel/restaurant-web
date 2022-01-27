import { Component, OnInit } from '@angular/core';
import {map} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Dish} from "../dishes-data/Dish";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor( public db : AngularFirestore, public auth : AuthService) { }
  users : any[] =[]

  ngOnInit(): void {
    this.db.collection("users").snapshotChanges().pipe(map(changes =>
      changes.map(c =>
        ({id: c.payload.doc.id, data: c.payload.doc.data() })
      ))).subscribe(data => {
      this.users = data;
    });
  }

  addadmin(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.role = 'admin';
    this.updateUser(id, data);
  }
  unaddadmin(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.role = 'client';
    this.updateUser(id, data);
  }
  addmenager(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.role = 'menager';
    this.updateUser(id, data);
  }
  unaddmenager(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.role = 'client';
    this.updateUser(id, data);
  }
  ban(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.ban = true;
    this.updateUser(id, data);
  }
  unban(user : any){
    let id = user.id;
    let data = user.data;
    if(!this.checkUser(id)){
      return
    }
    data.ban = false;
    this.updateUser(id, data);
  }
  checkUser(id:string){
    if(this.auth.userLogged?.uid == id){
      alert("Zmiana ustawień własnego konta jest zablokowana!")
      return false
    }
    return true
  }
  updateUser(id:string, data : any){
    if(this.auth.userLogged?.uid == id){
      alert("Zmiana ustawień własnego konta jest zablokowana!")
      return
    }
    else{
      this.db.collection("users").doc(id).update(data)
        .then(() => {
          alert("Zmiany zostały wprowadzone")
        });
    }
  }

}
