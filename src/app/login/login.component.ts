import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements AfterViewInit {
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
  isOtpRequestSuccessful = false;
  loading = false;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firebaseService: FirebaseService,
    private readonly snackBarService: MatSnackBar
  ) {}
  // constructor(readonly authService: AuthService) {
  //   this.isAutoLogout = localStorage.getItem('autoLogOff') === 'true' ?? false;
  //   localStorage.setItem('autoLogOff', 'false');
  // }

  ngAfterViewInit(): void {
    this.firebaseService.init();
    this.firebaseService.otpRequested$.subscribe(
      (isOtpRequestSuccessful: boolean) => {
        this.isOtpRequestSuccessful = isOtpRequestSuccessful;
        this.loading = false;
      }
    );
    this.firebaseService.otpVerified$.subscribe(
      (isOtpRequestSuccessful: any) => {
        this.loading = false;
        if (isOtpRequestSuccessful) {
          this.snackBarService.open('OTP verified!');
          this.router.navigate([`../matrimony`]);
        }
      }
    );
  }

  login() {
    //if (this.loginForm.dirty && this.loginForm.valid) {
    // this.authService.login(
    //   this.loginForm.controls.userName.value!,
    //   this.loginForm.controls.password.value!
    // );
    this.firebaseService.signInWithPhoneNumber(
      this.loginForm.controls.phoneNumber.value!
    );
    this.loading = true;
    alert('logging in');
    //}
    return false;
  }

  verify() {
    this.firebaseService.verifyCode(this.loginForm.controls.password.value!);
    this.loading = true;
  }

  initiateNewAccount() {
    this.router.navigate([`../user/0`]);
  }

  forgotPassword() {
    alert('to do: navigate to reset password');
  }
}
