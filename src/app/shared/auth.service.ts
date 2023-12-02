import { Injectable } from '@angular/core';
import { UserCache } from './user-cache.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sAuthenticatedKey = 'userInfo';

  public get isAuthenticated() {
    const userInfo = this.loggedInUserInfo;
    return userInfo.isAuthenticated;
  }

  public set loggedInUserInfo(user: UserCache) {
    sessionStorage.setItem(this.sAuthenticatedKey, JSON.stringify(user));
  }

  public get loggedInUserInfo() {
    const userInfoJson = sessionStorage.getItem(this.sAuthenticatedKey);
    return userInfoJson == null ||
      userInfoJson == undefined ||
      userInfoJson == ''
      ? new UserCache()
      : (JSON.parse(userInfoJson) as UserCache);
  }
}
