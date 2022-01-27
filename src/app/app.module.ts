import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishComponent } from './dishes/dish/dish.component';
import { DishesComponent } from './dishes/dishes.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { HeaderComponent } from './header/header.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import {AddDishComponent} from "./add-dish/add-dish.component";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RatingComponent } from './dishes/dish/rating/rating.component';
import { DishFilterPipe } from './pipes/dish-filter.pipe';
import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { SelectionMultiComponent } from './selection-bar/selection-multi/selection-multi.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { SelectionSlideComponent } from './selection-bar/selection-slide/selection-slide.component';
import {NpnSliderModule} from "npn-slider";
import { MainComponent } from './main/main.component';
import { DishDetailsComponent } from './dishes/dish-details/dish-details.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { ChangeDishComponent } from './dishes/change-dish/change-dish.component';
import { RegisterComponent } from './login/register/register.component';
import { LoginComponent } from './login/login.component';
import { PersistanceComponent } from './persistance/persistance.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserViewComponent } from './user-view/user-view.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { DishesMenagerComponent } from './dishes-menager/dishes-menager.component';

@NgModule({
  declarations: [
    AppComponent,
    DishComponent,
    DishesComponent,
    HeaderComponent,
    CurrencyPipe,
    ShoppingCardComponent,
    AddDishComponent,
    RatingComponent,
    DishFilterPipe,
    SelectionBarComponent,
    SelectionMultiComponent,
    SelectionSlideComponent,
    MainComponent,
    DishDetailsComponent,
    ChangeDishComponent,
    RegisterComponent,
    LoginComponent,
    PersistanceComponent,
    PageNotFoundComponent,
    UserViewComponent,
    UserDetailsComponent,
    AdminViewComponent,
    DishesMenagerComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    NgMultiSelectDropDownModule,
    NpnSliderModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
