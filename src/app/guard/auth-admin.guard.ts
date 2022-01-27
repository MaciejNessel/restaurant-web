import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['login'])
      return false
    } else {
      if(this.authService.getRole()=="admin"){
        return true
      }
      else{
        this.router.navigate(['/'])
        return false
      }
    }
  }

}
