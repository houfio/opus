import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    userId: string
  }>;

  public constructor(route: ActivatedRoute, router: Router, projectService: ProjectService, authService: AuthService) {
    this.project$ = route.paramMap.pipe(
      switchMap((params) => combineLatest([
        projectService.getProject(params.get('project')),
        authService.user$
      ])),
      map(([project, user]) => !project || !user ? undefined : ({
        ...project,
        userId: user.uid
      })),
      filterNullish(),
      catchError(() => {
        router.navigate(['/']);

        return EMPTY;
      })
    );
  }
}
