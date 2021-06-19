import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-task-overlay',
  templateUrl: './task-overlay.component.html',
  styleUrls: ['./task-overlay.component.scss']
})
export class TaskOverlayComponent {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public task!: IdentifiableModel<TaskModel>;
  @Output()
  public dismiss = new EventEmitter();
}
