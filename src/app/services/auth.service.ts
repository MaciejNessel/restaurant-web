import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth';
import { signOut} from "@angular/fire/auth";
import {Router} from "@angular/router";
import {setPersistence, signInWithEmailAndPassword, browserSessionPersistence,browserLocalPersistence } from "firebase/auth";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import firebase from "firebase/compat";
import User = firebase.User;
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authFire = getAuth();
  public userLogged: User|null = null;
  public userLoggedEmail = null;
  public userData: any
  dataUser: any
  constructor(private router: Router, public db : AngularFirestore) {
    this.getUser()
  }

  registerNew(email : string, password : string){
    createUserWithEmailAndPassword(this.authFire, email, password).then((userCredential) => {
      this.getUser();
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  getUser(){
    onAuthStateChanged(this.authFire, (user) => {
      if (user!=null) {
        // @ts-ignore
        this.userLogged = user;
        // @ts-ignore
        this.userLoggedEmail= user.email;
        this.setRole()
        this.getUserData(user.uid).then((x) =>{
          if(x===null){
            this.userData = x;
            this.router.navigate(['user-details']);
          }
        })

      } else {
      }
    });
  }



  async checkIsUpdatedData() {
    // @ts-ignore
    return await this.getUserData(this.userLogged.uid)
  }

  updateDataView(){
    this.router.navigate(['user-details'])
  }

  login(email : string, password: string){
    signInWithEmailAndPassword(this.authFire, email, password)
      .then((userCredential) => {
        this.getUser();
        this.router.navigate(['/'] );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Podano niepoprawny adres e-mail lub hasło")
      });
  }

  async getUserData(id: string) {
    let docRef = this.db.collection("users").doc(id);
    return docRef.ref.get().then((doc) => {
      if (doc.exists)
        return doc.data();
      else
        return null;
    });
  }

  logout(){
    signOut(this.authFire).then(() => {
      this.userLogged = null;
      this.router.navigate(['/'] );
      this.dataUser = null;
      this.userLoggedEmail = null;
      this.userData =null;
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  addDataUser(data : any){
    onAuthStateChanged(this.authFire, (user) => {
      if (user!=null) {
        // @ts-ignore
        this.userLogged = user;
        // @ts-ignore
        this.userLoggedEmail= user.email;
        this.db.collection("users").doc(user.uid).set(data)
        this.router.navigate(['/'])
        }
      else {
      }
  });}

  userInfo(){
    if(this.userLogged!=null){
      this.router.navigate(['user-view/'+this.userLogged.uid])
    }
  }

  isLoggedIn(){
    getAuth();
    return this.userLogged!=null;
  }

  setRole(){
    let docRef = this.db.collection("users").doc(this.userLogged?.uid);
    docRef.ref.get().then((doc) => {
      if (doc.exists){
        this.dataUser = doc.data();
    }})
}
  getRole(){
    return this.dataUser?.role;
  }
  isAdmin(){
    return this.dataUser?.role=="admin";
  }
  isMenager(){
    return (this.dataUser?.role=="menager" || this.dataUser?.role=="admin");
  }

  isBought() {
    return true
  }


}
