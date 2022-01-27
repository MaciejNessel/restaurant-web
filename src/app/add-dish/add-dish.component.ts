import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categories } from 'src/app/dishes-data/Categories';
import { Cusines } from 'src/app/dishes-data/Cusines';
import { AbstractControl} from '@angular/forms';
import {DishesService} from "../services/dishes.service";
import {Dish} from "../dishes-data/Dish";


@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css']
})

export class AddDishComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  categories = Categories;
  cusines = Cusines;

  constructor(private formBuilder: FormBuilder, public dishService : DishesService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      price: ['', [Validators.required, Validators.pattern("^\\d+\\.\\d{0,2}$")]],
      cusine: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      max_orders: ['', [Validators.required]],
      image_src: ['', [Validators.required]],
      ingredients:['', [Validators.required]],
      image_src_optional: [''],
      description: ['']
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get newDish(): Dish {
    return {
      name: this.form.value.name,
      cusine: this.form.value.cusine,
      categories: this.form.value.categories,
      price: "$" + this.form.value.price,
      ingredients: this.form.value.ingredients,
      max_orders:this.form.value.max_orders,
      image_src: this.form.value.image_src,
      image_src_optional: (this.form.value.image_src_optional).split(','),
      rate: -1,
      rate_counter: 0,
      description: this.form.value.description
    };
  }

  submit() {
    this.submitted = true;
    if (this.form.invalid){
      return;
    } else{
      this.dishService.addDish(this.newDish);
      this.form.reset();
      this.submitted=false;
    }
  }
}
