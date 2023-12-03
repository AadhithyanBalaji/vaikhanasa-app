import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  QueryFieldFilterConstraint,
  collection,
  collectionData,
  doc,
  getDocs,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFirebaseCollectionsService } from './firebase-collections.service.interface';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCollectionsBaseService
  implements IFirebaseCollectionsService
{
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly firestore: Firestore
  ) {}

  collectionName!: string;
  collection!: CollectionReference<DocumentData>;

  init(collectionName: string) {
    this.collectionName = collectionName;
    this.collection = collection(this.firestore, this.collectionName);
  }

  async addDoc(obj: any) {
    await setDoc(doc(this.collection, obj.userName), obj);
    this.snackBar.open('Record created!');
  }

  getAllDoc() {
    return collectionData(this.collection);
  }

  updateUserStatus(user: any, status: boolean) {
    setDoc(
      doc(this.firestore, 'users', user.userName),
      { isActive: status },
      { merge: true }
    );
  }

  async getDocByQuery(where: QueryFieldFilterConstraint) {
    const snapShot = await getDocs(query(this.collection, where));
    return snapShot.docs.map((doc) => doc.data());
  }
}
