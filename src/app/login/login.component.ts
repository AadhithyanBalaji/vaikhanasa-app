import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('[- +()0-9]+'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });
  isAutoLogout = false;
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}
  // constructor(readonly authService: AuthService) {
  //   this.isAutoLogout = localStorage.getItem('autoLogOff') === 'true' ?? false;
  //   localStorage.setItem('autoLogOff', 'false');
  // }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      // this.authService.login(
      //   this.loginForm.controls.userName.value!,
      //   this.loginForm.controls.password.value!
      // );
      alert('logging in');
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
