import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { TaskModel } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-overlay',
  templateUrl: './task-overlay.component.html',
  styleUrls: ['./task-overlay.component.scss']
})
export class TaskOverlayComponent implements OnInit {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public task!: IdentifiableModel<TaskModel>;
  @Output()
  public dismiss = new EventEmitter();

  public data!: IdentifiableModel<TaskModel>;

  public constructor(private taskService: TaskService) {
  }

  public ngOnInit() {
    this.data = {
      ...this.task
    };
  }

  public updateTask() {
    this.taskService.updateTask(this.project, {
      ...this.data,
      points: parseInt(String(this.data.points), 10) || 0
    }).subscribe(() => this.dismiss.emit());
  }
}
