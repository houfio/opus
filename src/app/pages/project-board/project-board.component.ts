import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { UserModel } from '../../models/user.model';
import { filterNullish } from '../../operators/filter-nullish';
import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { StateService } from '../../services/state.service';
import { TaskService } from '../../services/task.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    states: IdentifiableModel<StateModel>[],
    activeSprint?: IdentifiableModel<SprintModel>,
    tasks: IdentifiableModel<TaskModel>[],
    lanes: IdentifiableModel<UserModel>[]
  }>;

  public constructor(route: ActivatedRoute, projectService: ProjectService, stateService: StateService, taskService: TaskService, sprintService: SprintService, userService: UserService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        stateService.getStates(project),
        taskService.getTasks(project),
        sprintService.getCurrentSprint(project),
        userService.getUsers(project)
      ])),
      map(([project, states, tasks, activeSprint, users]) => ({
        ...project,
        states,
        activeSprint,
        tasks,
        lanes: users.filter((user) => project.users.indexOf(user.id) !== -1)
      }))
    );
  }
}
