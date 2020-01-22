import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userData: Observable<firebase.User>;
  isAdmin = false;

  constructor(private angularFireAuth: AngularFireAuth, private db: AngularFirestore) {
    this.userData = angularFireAuth.authState;
    angularFireAuth.auth.setPersistence('session');

    this.db.collection('admin').get()
    .subscribe(data => data.forEach(param => {if (this.getUser() && param.get('email') === this.getUser().email) { this.isAdmin = true; }}));
  }

  getDB() {return this.db; }

  login(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
    .then((result) => {    localStorage.setItem('user', JSON.stringify(result));  })
    .catch ((error) => {   console.log(error.message); });
    }


  register(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
    }

  getUser() {
      return this.angularFireAuth.auth.currentUser;
    }

  signOut() {
    return this.angularFireAuth.auth.signOut()
    .then(() => {localStorage.removeItem('user'); });
  }

}





