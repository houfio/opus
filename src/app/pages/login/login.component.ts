import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public constructor(private authService: AuthService) {
  }

  public login() {
    this.authService.login().subscribe();
  }
}
