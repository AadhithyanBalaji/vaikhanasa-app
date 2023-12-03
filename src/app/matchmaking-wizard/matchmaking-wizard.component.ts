import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { withLatestFrom } from 'rxjs';
import { Helper } from '../helpers/helper';

@Component({
  selector: 'app-matchmaking-wizard',
  templateUrl: './matchmaking-wizard.component.html',
  styleUrls: ['./matchmaking-wizard.component.css'],
})
export class MatchmakingWizardComponent {
  form = this.formBuilder.group({
    userName: ['', [Validators.required]],
    ageGap: [NaN, [Validators.required]],
  });
  matchingUsers: any = [];
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService
  ) {}

  getMatches() {
    if (this.form.valid && this.form.dirty) {
      this.userService.getAllUsers().subscribe((users) => {
        this.userService
          .getUserByName(this.form.controls.userName.value!)
          .subscribe((user) => {
            this.matchingUsers = users.filter(
              (x) =>
                x['userName'] !== user?.userName &&
                Helper.isTruthy(x['clanId']) &&
                x['clanId'] !== user?.clanId &&
                Helper.isTruthy(x['gender']) &&
                x['gender'] !== user?.gender
              // to handle dob/age check here
            );
          });
      });
    }
  }
}
