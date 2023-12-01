import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../model/user.model';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.pattern('[- +()0-9]+')]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });
  isAutoLogout = false;
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly firebaseService: UserService,
    private readonly snackBarService: MatSnackBar,
    private readonly authService: AuthService
  ) {}

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const userName = this.loginForm.controls.userName.value!;
      const password = this.loginForm.controls.password.value!;
      this.loading = true;
      this.firebaseService.getUserByName(userName).then((data) => {
        if (data !== null && data !== undefined && data.length > 0) {
          const savedUser = data[0] as User;
          if (savedUser.password === password) {
            this.authService.isAuthenticated = true;
            this.snackBarService.open(
              `Welcome ${savedUser.firstName} ${savedUser.lastName}!`
            );
            this.router.navigate([`../`]);
          } else {
            this.snackBarService.open('Check user name/password');
          }
        }
        this.loading = false;
      });
    }
    return false;
  }

  initiateNewAccount() {
    this.router.navigate([`../user/0`]);
  }

  forgotPassword() {
    alert('to do: navigate to reset password');
  }
}
