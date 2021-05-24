import { Component, Input } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public sprint!: IdentifiableModel<SprintModel>;
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];

  public get tasksInSprint() {
    return this.tasks.filter((task) => task.sprint === this.sprint.id);
  }

  public onDrop(event: unknown) {
    console.log(event);
  }
}
