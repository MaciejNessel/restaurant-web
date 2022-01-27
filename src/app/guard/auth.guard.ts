import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    if (this.authService.isLoggedIn()==null) {
      console.log("Najpierw się zaloguj!")
      console.log(this.authService.isLoggedIn())
      this.router.navigate(['login'])
      return false
    } else {
      return true
    }
  }
}
