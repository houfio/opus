import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public readonly projects: Observable<{}[]>;

  constructor(private auth: AngularFireAuth, store: AngularFirestore, private router: Router) {
    this.projects = store.collection<{}>('projects').valueChanges();
  }

  public logout() {
    this.auth.signOut()
      .then(() => this.router.navigate(['login']));
  }
}
