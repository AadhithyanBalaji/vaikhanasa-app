import { Injectable } from '@angular/core';
import { where } from '@angular/fire/firestore';
import { FirebaseCollectionsBaseService } from './firebase-collections-base.service';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private readonly apiService: FirebaseCollectionsBaseService) {
    this.apiService.init('users');
  }

  async createUser(user: User) {
    this.apiService.addDoc(user);
  }

  async getUserByName(userName: string) {
    const filter = where('userName', '==', userName);
    return this.apiService.getDocByQuery(filter);
  }
}
