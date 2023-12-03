import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirebaseCollectionsBaseService } from './firebase-collections-base.service';
import { User } from '../model/user.model';
import { from } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly apiService: FirebaseCollectionsBaseService) {
    this.apiService.init('users');
  }

  async createUser(user: User) {
    this.apiService.addDoc(user);
  }

  getAllUsers() {
    return this.apiService.getAllDoc();
  }

  updateUserStatus(user: any, status: boolean) {
    this.apiService.updateUserStatus(user, status);
  }

  getUserByName(userName: string) {
    const filter = where('userName', '==', userName);
    return from(
      this.apiService
        .getDocByQuery(filter)
        .then((data) =>
          data !== null && data !== undefined && data.length > 0
            ? (data[0] as User)
            : null
        )
    );
  }
}
