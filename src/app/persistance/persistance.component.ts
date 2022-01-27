import { Component, OnInit } from '@angular/core';
import {browserSessionPersistence, getAuth, setPersistence} from "firebase/auth";
import firebase from "firebase/compat";
import {browserLocalPersistence, browserPopupRedirectResolver, inMemoryPersistence} from "@firebase/auth";

@Component({
  selector: 'app-persistance',
  templateUrl: './persistance.component.html',
  styleUrls: ['./persistance.component.css']
})
export class PersistanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  session(){
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        alert("Wybrano: session")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  none(){
    const auth = getAuth();
    setPersistence(auth, inMemoryPersistence)
      .then(() => {
        alert("Wybrano: none")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  local(){
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        alert("Wybrano: local")
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
