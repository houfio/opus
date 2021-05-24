import { Component } from '@angular/core';
import { faTable } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public readonly logo = faTable;

  public constructor(public authService: AuthService) {
  }
}
