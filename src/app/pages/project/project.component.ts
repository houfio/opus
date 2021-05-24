import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

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
  public project$: Observable<IdentifiableModel<ProjectModel>>;

  public constructor(route: ActivatedRoute, router: Router, projectService: ProjectService, public authService: AuthService) {
    this.project$ = route.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      catchError(() => {
        router.navigate(['/']);

        return EMPTY;
      })
    );
  }
}
