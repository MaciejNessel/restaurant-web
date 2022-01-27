import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Categories} from "../../dishes-data/Categories";
import {Cusines} from "../../dishes-data/Cusines";
import {DishesService} from "../../services/dishes.service";
import {Dish} from "../../dishes-data/Dish";

@Component({
  selector: 'app-change-dish',
  templateUrl: './change-dish.component.html',
  styleUrls: ['./change-dish.component.css']
})
export class ChangeDishComponent implements OnInit {
  submitted = false;
  form!: FormGroup;
  categories = Categories;
  cusines = Cusines;
  id;
  dish !: Dish;
  constructor(private router : Router, private route: ActivatedRoute, private formBuilder: FormBuilder, public dishService : DishesService) {
    this.id = this.route.snapshot.params['id'];
    dishService.getDish(this.id).then(r=> {
      // @ts-ignore
      this.dish = r;
      this.form = this.formBuilder.group({
        name: [this.dish.name, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        price: [this.dish.price.slice(1).toString(), [Validators.required, Validators.pattern("^\\d+\\.\\d{0,2}$")]],
        cusine: [this.dish.cusine, [Validators.required]],
        categories: [this.dish.categories, [Validators.required]],
        max_orders: [this.dish.max_orders, [Validators.required]],
        image_src: [this.dish.image_src, [Validators.required]],
        ingredients:[this.dish.ingredients, [Validators.required]],
        image_src_optional: [this.dish.image_src_optional],
        description: [this.dish.description]
      });
    });
  }
  ngOnInit() {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get newDish(): Dish {
    return {
      name: this.form.value.name,
      cusine: this.form.value.cusine,
      categories: this.form.value.categories,
      price: this.form.value.price,
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
      this.dishService.updateDish(this.id, this.newDish);
      this.submitted=false;
      this.back();
    }
  }

  back(){
    this.router.navigate(["menu/"+this.id]);
  }
}
