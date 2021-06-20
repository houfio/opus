import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotifierService } from 'angular-notifier';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-unarchive-overlay',
  templateUrl: './unarchive-overlay.component.html',
  styleUrls: ['./unarchive-overlay.component.scss']
})
export class UnarchiveOverlayComponent {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];
  @Output()
  public dismiss = new EventEmitter();

  public constructor(private taskService: TaskService, private notifierService: NotifierService) {
  }

  public get archivedTasks() {
    return this.tasks.filter((task) => task.archived);
  }

  public archiveTask(task: IdentifiableModel<TaskModel>) {
    this.taskService.archiveTask(this.project, task)
      .subscribe(() => this.notifierService.notify('success', 'Task successfully unarchived'));
  }
}
