import { Injectable } from '@angular/core';
import { UserCache } from './user-cache.model';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sAuthenticatedKey = 'userInfo';
  userCache$ = new BehaviorSubject<UserCache>(new UserCache());

  public login(savedUser: User) {
    const userCache = new UserCache(
      savedUser.userName,
      true,
      savedUser?.isAdmin ?? false
    );
    this.setUserCache(userCache);
  }

  public logout() {
    this.setUserCache(null);
  }

  private setUserCache(userCache: UserCache | null) {
    sessionStorage.setItem(this.sAuthenticatedKey, JSON.stringify(userCache));
    this.userCache$.next(userCache ?? new UserCache());
  }
}
