import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private auth: AngularFireAuth, private router: Router) {
  }

  public logout() {
    this.auth.signOut()
      .then(() => this.router.navigate(['login']));
  }
}
