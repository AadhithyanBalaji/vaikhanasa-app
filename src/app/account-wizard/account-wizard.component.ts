import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormValidators } from '../helpers/form-validators';

@Component({
  selector: 'app-account-wizard',
  templateUrl: './account-wizard.component.html',
  styleUrls: ['./account-wizard.component.css'],
})
export class AccountWizardComponent {
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    clanId: [],
    relationShipStatus: [null, Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    lat: [''],
    lng: [''],
    contactNumber: [''],
    phoneNumber: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    userName: [
      '',
      {
        validators: [Validators.required],
        asyncValidators: [FormValidators.userNameValidator(this.userService)],
        updateOn: 'change',
      },
    ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  isEditable = false;
  stepperOrientation: Observable<StepperOrientation>;
  relationShipStatuses = [
    { id: 1, name: 'Single' },
    { id: 2, name: 'Married' },
    { id: 3, name: 'Divorced' },
    { id: 4, name: 'Separated' },
    { id: 5, name: 'Widow' },
  ];

  clans = [
    { id: 1, name: 'Kashyap' },
    { id: 2, name: 'Atri' },
    { id: 3, name: 'Bharadvaja' },
    { id: 4, name: 'Bhrigu' },
    { id: 5, name: 'Goutama' },
    { id: 6, name: 'Vasishta' },
    { id: 7, name: 'Vishwamitra' },
  ];
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  saveUser() {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {
      const f1 = this.firstFormGroup.value;
      const f2 = this.secondFormGroup.value;
      const f3 = this.thirdFormGroup.value;

      var dateParts = f1.dob!.split('/');
      if (dateParts?.length < 3) {
        return;
      }
      var dateObject = new Date(
        +dateParts[2],
        +dateParts[1] - 1,
        +dateParts[0]
      );

      const user: User = {
        firstName: f1.firstName!,
        lastName: f1.lastName!,
        dob: dateObject,
        clanId: f1.clanId!,
        relationShipStatus: f1.relationShipStatus!,

        userName: f3.userName!,
        password: f3.password!,

        address: {
          lat: f2.lat!,
          lng: '',
        },
        contactNumber: f2.contactNumber!,
        phoneNumber: f2.phoneNumber!,
        isActive: false,
      };
      this.createUserAccount(user);
    } else {
      this.snackBar.open('Errors found in data entered. Please check');
    }
  }

  createUserAccount(user: User) {
    this.userService
      .createUser(user)
      .then((_) => {
        this.router.navigate([`../..`]);
      })
      .catch((err) => console.log(err));
  }
}
