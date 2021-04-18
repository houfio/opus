import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly authenticated$: Observable<boolean>;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.authenticated$ = auth.authState.pipe(
      map((state) => Boolean(state))
    );
  }

  public login() {
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(() => this.router.navigate(['']));
  }

  public logout() {
    return this.auth.signOut()
      .then(() => this.router.navigate(['login']));
  }
}
