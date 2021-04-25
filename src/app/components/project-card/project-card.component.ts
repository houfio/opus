import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent {
  @Input() public project?: IdentifiableModel<ProjectModel>;
  @Output() public press = new EventEmitter<void>();

  public icon = faPlus;

  public get isButton() {
    return Boolean(this.press.observers.length);
  }
}
