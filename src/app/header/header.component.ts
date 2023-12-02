import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { UserCache } from '../shared/user-cache.model';
import { UserService } from '../shared/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  displayName: string = '';
  isMobile: Observable<boolean>;

  constructor(
    readonly authService: AuthService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly breakpointObserver: BreakpointObserver
  ) {
    this.isMobile = this.breakpointObserver
      .observe('(max-width: 800px)')
      .pipe(map(({ matches }) => matches));
  }

  ngOnInit(): void {
    const userCache = this.authService.loggedInUserInfo;
    this.userService.getUserByName(userCache.userName).then((loggedInUser) => {
      this.displayName = loggedInUser
        ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
        : '';
    });
  }

  logOut() {
    const userCache = new UserCache(false, '');
    this.authService.loggedInUserInfo = userCache;
    this.router.navigate(['login']);
  }
}
