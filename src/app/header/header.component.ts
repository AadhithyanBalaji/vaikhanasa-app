import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logOut() {
    this.authService.isAuthenticated = false;
    this.router.navigate(['login']);
  }
}
