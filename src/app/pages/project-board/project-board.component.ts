import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel> & {
    lanes: string[]
  }>;

  public constructor(route: ActivatedRoute, data: DataService) {
    this.projects$ = route.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project') ?? '')),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        data.getUsers(project)
      ])),
      map(([project, users]) => ({
        ...project,
        lanes: users.filter((user) => project.users.indexOf(user.id) !== -1).map((user) => user.name)
      }))
    );
  }
}
