import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { UserService } from './user-service.service'
import { User } from '../models'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(private userService: UserService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.userService.isLoggedInUser()) {
  //     return true;
  //   } else {
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  // }

  canActivate(): Observable<boolean | UrlTree> {
    return this.userService.user$.pipe(
      tap((user) => {
        if (!user) {
          this.router.navigate(['/login']);
        }
      }),
      map(user => !!user)
    );
  }
  
}
