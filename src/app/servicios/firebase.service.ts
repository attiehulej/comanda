import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore) { }

  getDocs(collection: string) {
    return this.firestore.collection(collection).snapshotChanges();
  }

  getDoc(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).snapshotChanges();
  }

  //addDoc(collection: string,doc: any) {
  addDoc2(collection: string, documentId: string,doc: any) {
    //return this.firestore.collection(collection).add(doc);
    return this.firestore.collection(collection).doc(documentId).set(doc);
  }

  addDoc(collection: string,doc: any) {
    return this.firestore.collection(collection).add(doc);
  }

  updateDoc(collection: string, documentId: string, obj: any) {
    return this.firestore.collection(collection).doc(documentId).update(obj);
  }

  deleteDoc(collection: string, documentId: string) {
    return this.firestore.collection(collection).doc(documentId).delete();
  }
}
