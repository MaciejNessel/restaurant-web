import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]]
    });
  }

  submit() {
    if(this.form.value.password!=this.form.value.repassword){
      alert('Hasła się nie zgadzają!')
    }
    else{
      this.authService.registerNew(this.form.value.login, this.form.value.password);
    }
  }
}
