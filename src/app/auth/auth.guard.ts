import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    const isLoggedIn = this.authService.isAuth;
    if (isLoggedIn) {
      return true;
    }

    return this.router.createUrlTree(['/auth']);
  }
}
