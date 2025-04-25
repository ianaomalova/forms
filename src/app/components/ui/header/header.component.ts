import { Component } from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
