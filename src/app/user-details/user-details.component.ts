import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, public authService: AuthService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }
  submit() {
    let data = {
      first_name : this.form.value.first_name,
      last_name : this.form.value.last_name,
      phone : this.form.value.phone
    }
    if(this.form.value.first_name == '' || this.form.value.last_name=='' || this.form.value.phone==''){
      alert("Uzupełnij brakujące dane.")
      return
    }

    if(this.authService.userLogged!==null){
      this.authService.addDataUser(data)
    }
  }

}
