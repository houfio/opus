import { Component, HostBinding, Input } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.scss']
})
export class BacklogTaskComponent {
  @Input()
  public task!: IdentifiableModel<TaskModel>;
}
