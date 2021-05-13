import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public project$: Observable<IdentifiableModel<ProjectModel>>;

  public constructor(route: ActivatedRoute, data: DataService, public auth: AuthService) {
    this.project$ = route.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project'))),
      filterNullish()
    );
  }
}
