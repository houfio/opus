import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly authenticated$: Observable<boolean>;

  private id?: string;

  constructor(private auth: AngularFireAuth, private router: Router) {
    this.authenticated$ = auth.authState.pipe(
      tap((state) => this.id = state?.uid),
      map((state) => Boolean(state))
    );
  }

  public get userId() {
    return this.id;
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
