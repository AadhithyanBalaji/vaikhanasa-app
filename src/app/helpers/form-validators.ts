import { AsyncValidatorFn, AbstractControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  first,
  of,
} from 'rxjs';
import { UserService } from '../shared/user.service';
import { User } from '../model/user.model';

export class FormValidators {
  static userNameValidator(userService: UserService): AsyncValidatorFn {
    return (control: AbstractControl): any => {
      return control.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((userName) =>
          userService
            .getUserByName(userName)
            .then((fbUser) => fbUser === null)
            .catch(() => false)
        ),
        map((isValid: boolean) =>
          isValid
            ? null
            : {
                duplicateUser: true,
              }
        ),
        first()
      );
    };
  }

  static userNameExists(userService: UserService): AsyncValidatorFn {
    return (formGroup: AbstractControl): any => {
      return formGroup.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((formValue) =>
          userService
            .getUserByName(formValue.userName)
            .then((fbUser) => fbUser)
            .catch(() => null)
        ),
        map((fbUser: User | null) => {
          const formUserName = formGroup.value.userName;
          const formPassword = formGroup.value.password;
          if (
            fbUser?.userName === formUserName &&
            fbUser?.password === formPassword
          ) {
            return null;
          } else if (fbUser === null) {
            return {
              doesNotExist: true,
            };
          } else if (
            fbUser?.userName === formUserName &&
            fbUser?.password !== formPassword
          ) {
            return {
              invalidPassword: true,
            };
          } else {
            alert('Unknown error occurred! Check with support');
            return null;
          }
        }),
        first()
      );
    };
  }
}
