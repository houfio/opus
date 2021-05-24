import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    lanes: string[]
  }>;

  public constructor(route: ActivatedRoute, projectService: ProjectService, userService: UserService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        userService.getUsers(project)
      ])),
      map(([project, users]) => ({
        ...project,
        lanes: users.filter((user) => project.users.indexOf(user.id) !== -1).map((user) => user.name)
      }))
    );
  }
}
