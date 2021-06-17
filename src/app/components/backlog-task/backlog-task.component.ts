import { Component, Input } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-backlog-task',
  templateUrl: './backlog-task.component.html',
  styleUrls: ['./backlog-task.component.scss']
})
export class BacklogTaskComponent {
  @Input()
  public task!: IdentifiableModel<TaskModel>;
  @Input()
  public states!: IdentifiableModel<StateModel>[];

  public get state() {
    const sorted = [...this.states].sort((a, b) => a.order - b.order);
    const found = !this.task.state ? sorted[0] : sorted.find((s) => s.id === this.task.state);

    return found?.name ?? '';
  }
}
