import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public constructor(private authService: AuthService, private notifierService: NotifierService) {
  }

  public login() {
    this.authService.login()
      .subscribe(() => this.notifierService.notify('success', 'Successfully logged in'));
  }
}
