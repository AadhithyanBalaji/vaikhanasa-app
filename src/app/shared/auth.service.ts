import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly sAuthenticatedKey = 'isAuthenticated';
  public get isAuthenticated() {
    return sessionStorage.getItem(this.sAuthenticatedKey) === '1';
  }
  public set isAuthenticated(isAuthenticated: boolean) {
    sessionStorage.setItem(this.sAuthenticatedKey, isAuthenticated ? '1' : '0');
  }
}
