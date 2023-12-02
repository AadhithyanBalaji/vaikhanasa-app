import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirebaseCollectionsBaseService } from './firebase-collections-base.service';
import { User } from '../model/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  onUserCreated$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly apiService: FirebaseCollectionsBaseService) {
    this.apiService.init('users');
  }

  async createUser(user: User) {
    this.apiService.addDoc(user).then((_) => this.onUserCreated$.next(true));
  }

  async getUserByName(userName: string) {
    const filter = where('userName', '==', userName);
    return this.apiService
      .getDocByQuery(filter)
      .then((data) =>
        data !== null && data !== undefined && data.length > 0
          ? (data[0] as User)
          : null
      );
  }
}
