// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { Injectable } from '@angular/core';
import {
  PhoneAuthProvider,
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
declare const grecaptcha: any;
declare const firebase: any;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA8qIiDeP7UgJbYFNUGhMOaW7eYJVZinNI',
  authDomain: 'vaikhanasa-db.firebaseapp.com',
  projectId: 'vaikhanasa-db',
  storageBucket: 'vaikhanasa-db.appspot.com',
  messagingSenderId: '1001865905627',
  appId: '1:1001865905627:web:3705c324976d59616b53fe',
  measurementId: 'G-N5MGKQJEEQ',
};

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  otpRequested$ = new BehaviorSubject<boolean>(false);
  otpVerified$ = new BehaviorSubject<any>(null);
  // Initialize Firebase
  init() {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const auth = getAuth();
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      auth,
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          alert('submit success');
        },
      }
    );
  }

  signInWithPhoneNumber(phoneNumber: string) {
    const appVerifier = (window as any).recaptchaVerifier;

    const auth = getAuth();
    signInWithPhoneNumber(auth, `+91${phoneNumber}`, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        (window as any).confirmationResult = confirmationResult;
        this.otpRequested$.next(true);
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log(error);
        this.otpRequested$.next(false);
        (window as any).recaptchaVerifier
          .render()
          .then(function (widgetId: any) {
            grecaptcha.reset(widgetId);
          });
      });
    // var provider = new PhoneAuthProvider(auth);
    // provider
    //   .verifyPhoneNumber(phoneNumber, appVerifier)
    //   .then(function (verificationId) {
    //     var verificationCode: any = window.prompt(
    //       'Please enter the verification ' +
    //         'code that was sent to your mobile device.'
    //     );
    //     return PhoneAuthProvider.credential(verificationId, verificationCode);
    //   })
    //   .then(function (phoneCredential) {
    //     return firebase.auth().signInWithCredential(phoneCredential);
    //   });
  }

  verifyCode(code: string) {
    (window as any).confirmationResult
      .confirm(code)
      .then((result: any) => {
        // User signed in successfully.
        console.log('logged in successfully', result);
        const user = result.user;
        this.otpVerified$.next(result);
        // ...
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log('error occurred while validating OTP', error);
        this.otpVerified$.next(error);
      });
  }
}
