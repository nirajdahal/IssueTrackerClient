import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtHelper: JwtHelperService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem("issueTrackerToken");
    var tokenExpired = this.jwtHelper.isTokenExpired(token);
    if (token != null && !tokenExpired ) {
      return true;
    }
    else {
      this.router.navigate(['/user/registration'])
      return false;
    }
  }
}
