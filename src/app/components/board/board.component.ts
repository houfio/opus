import { animateChild, query, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { UserModel } from '../../models/user.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class BoardComponent {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public activeSprint!: IdentifiableModel<SprintModel>;
  @Input()
  public states!: IdentifiableModel<StateModel>[];
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];
  @Input()
  public lanes!: IdentifiableModel<UserModel>[];

  public details?: IdentifiableModel<TaskModel>;

  public constructor(private taskService: TaskService) {
  }

  public get rows() {
    return [...this.lanes, undefined];
  }

  public get orderedStates() {
    return this.states.sort((a, b) => a.order - b.order);
  }

  public getTasks(user: IdentifiableModel<UserModel> | undefined, state: IdentifiableModel<StateModel>) {
    return this.tasks.filter((task) => (task.assignee === (user?.id ?? '') && task.state === state.id) || (!user && state === this.orderedStates[0] && task.state === ''));
  }

  public onDrop(event: CdkDragDrop<{ user: IdentifiableModel<UserModel> | undefined, state: IdentifiableModel<StateModel> }>) {
    this.taskService.moveTaskToLane(this.project, event.item.data, event.container.data.user?.id, event.container.data.state.id).subscribe();
  }
}
