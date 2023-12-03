import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-users-browser',
  templateUrl: './users-browser.component.html',
  styleUrls: ['./users-browser.component.css'],
})
export class UsersBrowserComponent {
  activeUsers: any;
  pendingUsers: any;
  constructor(private readonly userService: UserService) {
    this.userService.getAllUsers().subscribe((users) => {
      this.activeUsers = users.filter((x) => x['isActive'] === true);
      this.pendingUsers = users.filter((x) => x['isActive'] !== true);
    });
  }

  updateUserStatus(user: any, status: boolean) {
    this.userService.updateUserStatus(user, status);
  }
}
