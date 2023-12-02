import { Injectable } from '@angular/core';
import { UserCache } from './user-cache.model';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sAuthenticatedKey = 'userInfo';

  public login(savedUser: User) {
    const userCache = new UserCache(
      savedUser.userName,
      true,
      savedUser?.isAdmin ?? false
    );
    this.loggedInUserInfo = userCache;
  }

  public get isAuthenticated() {
    return this.loggedInUserInfo.isAuthenticated;
  }

  public get isAdmin() {
    return this.loggedInUserInfo.isAdmin;
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

  public logout() {
    const userCache = new UserCache();
    this.loggedInUserInfo = userCache;
  }
}
