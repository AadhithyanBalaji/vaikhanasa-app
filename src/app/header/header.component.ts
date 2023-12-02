import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { UserCache } from '../shared/user-cache.model';
import { UserService } from '../shared/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';
import { ViewPortService } from '../shared/viewport.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayName: string = '';
  isMobile: Observable<boolean>;
  isAdmin: boolean = false;

  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly viewportService: ViewPortService
  ) {
    this.isMobile = this.viewportService.isMobile;
  }

  ngOnInit(): void {
    const userCache = this.authService.loggedInUserInfo;
    this.userService.getUserByName(userCache.userName).then((loggedInUser) => {
      this.displayName = loggedInUser
        ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
        : '';
      this.isAdmin = loggedInUser?.isAdmin ?? false;
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
