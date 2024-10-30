import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccesGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const groupe= localStorage.getItem('groupe');
      const token = localStorage.getItem('token');
      if (token == null) {
        this.router.navigate(['']);
        return false;
      }
      if(groupe=='Client'){
        this.router.navigate(['/dashboard/client']);
        return false;
      }
    return true;
  }

}
