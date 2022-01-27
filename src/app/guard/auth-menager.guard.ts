import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthMenagerGuard implements CanActivate {
  constructor( public authService: AuthService, public router: Router )
  { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.getRole()=="menager" || this.authService.getRole()=="admin"){
        return true
      }
      else{
        console.log("Nie masz opcji admina!!!")
        this.router.navigate(['/'])
        return false
      }
    }

}
