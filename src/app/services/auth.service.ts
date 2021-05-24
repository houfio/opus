import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { defer, from, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly user$: Observable<firebase.User | undefined>;

  public constructor(private auth: AngularFireAuth, private router: Router) {
    this.user$ = auth.authState.pipe(
      map((state) => state ?? undefined)
    );
  }

  public login() {
    return defer(() => this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())).pipe(
      switchMap(() => from(this.router.navigate([''])))
    );
  }

  public logout() {
    return defer(() => this.auth.signOut()).pipe(
      switchMap(() => from(this.router.navigate(['login'])))
    );
  }
}
