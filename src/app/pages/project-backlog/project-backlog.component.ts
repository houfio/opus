import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { filterNullish } from '../../operators/filter-nullish';
import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { StateService } from '../../services/state.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    tasks: IdentifiableModel<TaskModel>[]
    states: IdentifiableModel<StateModel>[]
    sprints: IdentifiableModel<SprintModel>[]
  }>;

  public constructor(route: ActivatedRoute, projectService: ProjectService, taskService: TaskService, stateService: StateService, sprintService: SprintService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        taskService.getTasks(project),
        stateService.getStates(project),
        sprintService.getSprints(project)
      ])),
      map(([project, tasks, states, sprints]) => ({
        ...project,
        tasks,
        states,
        sprints
      }))
    )
  }

  public getBacklog(tasks: IdentifiableModel<TaskModel>[]) {
    return tasks.filter((task) => !task.sprint);
  }
}
