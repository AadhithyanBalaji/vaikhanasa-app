import { BreakpointObserver } from '@angular/cdk/layout';
import {
  STEPPER_GLOBAL_OPTIONS,
  StepperOrientation,
} from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { Observable, map, of, take } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormValidators } from '../helpers/form-validators';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal.component';

@Component({
  selector: 'app-account-wizard',
  templateUrl: './account-wizard.component.html',
  styleUrls: ['./account-wizard.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class AccountWizardComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dob: ['', Validators.required],
    gender: [NaN, Validators.required],
    clanId: new FormControl(),
    relationShipStatus: new FormControl(NaN, Validators.required),
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
        updateOn: 'change',
      },
    ],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  });
  isEditable = true;
  stepperOrientation: Observable<StepperOrientation> = of('vertical');
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

  genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];

  userName: string = '';
  mode: string = '';
  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly userService: UserService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.stepperOrientation = this.breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));

    this.route.params.subscribe((params) => {
      const userName = params['id'];
      this.mode = params['mode'];
      this.buildForm(userName);
    });
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
        gender: f1.gender!,
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
        isAdmin: false,
      };
      this.createUserAccount(user);
    } else {
      this.snackBar.open('Errors found in data entered. Please check');
    }
  }

  navigateBack() {
    if (
      this.firstFormGroup.dirty ||
      this.secondFormGroup.dirty ||
      this.thirdFormGroup.dirty
    ) {
      this.dialog
        .open(ModalComponent, {
          data: {
            title: 'Confirm unsaved changes',
            body: `Are you sure you want to discard the changes done?`,
          },
        })
        .afterClosed()
        .pipe(take(1))
        .subscribe((result) => (result ? this.return() : null));
    } else {
      this.return();
    }
  }

  private return() {
    this.router.navigate([this.mode === 'userMgmt' ? 'users' : 'login']);
  }

  private buildForm(userName: string) {
    this.thirdFormGroup.controls.userName.setValue(userName);
    if (!this.thirdFormGroup.controls.userName.errors) {
      this.userService.getUserByName(userName).subscribe((savedUser) => {
        if (savedUser == null) {
          return;
        }
        savedUser = savedUser!;
        this.firstFormGroup.patchValue({
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          dob: savedUser.dob.toString(),
          gender: savedUser.gender,
          clanId: +savedUser.clanId,
          relationShipStatus: savedUser.relationShipStatus,
        });

        this.secondFormGroup.patchValue({
          lat: savedUser?.address?.lat,
          lng: savedUser.address?.lng,
          contactNumber: savedUser.contactNumber,
          phoneNumber: savedUser.phoneNumber,
        });

        this.thirdFormGroup.patchValue({
          userName: savedUser.userName,
          password: savedUser.password,
          confirmPassword: savedUser.password,
        });
      });
    } else {
      this.thirdFormGroup.controls.userName.setAsyncValidators(
        FormValidators.userNameValidator(this.userService)
      );
    }
    this.thirdFormGroup.controls.userName.setValue(null, { emitEvent: false });
  }

  private createUserAccount(user: User) {
    this.userService
      .createUser(user)
      .then((_) => {
        this.router.navigate([this.mode === 'userMgmt' ? `users` : `home`]);
      })
      .catch((err) => console.log(err));
  }
}
