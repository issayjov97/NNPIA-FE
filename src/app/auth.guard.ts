import { LoginService } from './components/login/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    { url }: RouterStateSnapshot): Observable<boolean> | boolean {

    return this.checkLogin(url);
  }

  private checkLogin(url: string): boolean {
    console.log(url);
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }

}
