import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShoppingCardComponent} from "./shopping-card/shopping-card.component";
import {AddDishComponent} from "./add-dish/add-dish.component";
import {MainComponent} from "./main/main.component";
import {DishesComponent} from "./dishes/dishes.component";
import {DishDetailsComponent} from "./dishes/dish-details/dish-details.component";
import {ChangeDishComponent} from "./dishes/change-dish/change-dish.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./login/register/register.component";
import {UserDetailsComponent} from "./user-details/user-details.component";
import {UserViewComponent} from "./user-view/user-view.component";
import { AuthGuard } from "./guard/auth.guard";
import {AuthMenagerGuard} from "./guard/auth-menager.guard";
import {AdminViewComponent} from "./admin-view/admin-view.component";
import {AuthAdminGuard} from "./guard/auth-admin.guard";
import {DishesMenagerComponent} from "./dishes-menager/dishes-menager.component";

const routes: Routes = [
  {path:'', component: MainComponent},
  {path:'menu', component: DishesComponent},
  {path:'cart', component:ShoppingCardComponent, canActivate: [AuthGuard]},
  {path:'add', component: AddDishComponent,  canActivate: [AuthGuard, AuthMenagerGuard]},
  {path:'menu/:id', component: DishDetailsComponent, canActivate: [AuthGuard]},
  {path:'menu/:id/change', component: ChangeDishComponent, canActivate: [AuthGuard, AuthMenagerGuard]},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'user-details', component: UserDetailsComponent},
  {path:'user-view/:id', component: UserViewComponent},
  {path:'admin-view', component: AdminViewComponent, canActivate: [AuthGuard, AuthAdminGuard]},
  {path:'dishes-menager', component: DishesMenagerComponent, canActivate: [AuthGuard, AuthMenagerGuard]},
  { path: '**', pathMatch: 'full',
    component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
