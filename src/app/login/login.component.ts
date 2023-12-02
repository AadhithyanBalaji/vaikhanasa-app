import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../shared/auth.service';
import { UserCache } from '../shared/user-cache.model';
import { FormValidators } from '../helpers/form-validators';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'submit',
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(20)],
      updateOn: 'submit',
    }),
  });
  isAutoLogout = false;
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly firebaseService: UserService,
    private readonly snackBarService: MatSnackBar,
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {
    this.loginForm.addAsyncValidators([
      FormValidators.userNameExists(this.userService),
    ]);
    this.loginForm.updateValueAndValidity();
    this.loginForm.statusChanges
      .pipe(distinctUntilChanged())
      .subscribe((status) => {
        status === 'VALID' ? this.submitForm() : null;
        this.loading = false;
      });
  }

  login() {
    this.loading = true;
    return this.loginForm.dirty && this.loginForm.valid;
  }

  initiateNewAccount() {
    this.router.navigate([`../user/0`]);
  }

  forgotPassword() {
    alert('to do: navigate to reset password');
  }

  private submitForm() {
    this.loading = true;
    const userName = this.loginForm.controls.userName.value!;
    const password = this.loginForm.controls.password.value!;
    this.loading = true;
    this.firebaseService.getUserByName(userName).then((savedUser) => {
      savedUser = savedUser!;
      if (savedUser.password === password) {
        const userCache = new UserCache(true, savedUser.userName);
        this.authService.loggedInUserInfo = userCache;
        this.snackBarService.open(
          `Welcome ${savedUser.firstName} ${savedUser.lastName}!`
        );
        this.router.navigate([`../`]);
      }
      this.loading = false;
    });
  }
}
