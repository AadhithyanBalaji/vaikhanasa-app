import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  Firestore,
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  getDocs,
  query,
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

  async addDoc(doc: any) {
    await addDoc(this.collection, doc);
    this.snackBar.open('Record created!');
  }

  async getDocByQuery(where: QueryFieldFilterConstraint) {
    const snapShot = await getDocs(query(this.collection, where));
    return snapShot.docs.map((doc) => doc.data());
  }
}
