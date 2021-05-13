import { Component, Input } from '@angular/core';
import { faBorderAll, faCog, faStream } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input()
  public owner!: boolean;

  public backlog = faStream;
  public board = faBorderAll;
  public settings = faCog;
}
