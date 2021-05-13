import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent {
  public project$: Observable<IdentifiableModel<ProjectModel>>;

  public constructor(route: ActivatedRoute, private data: DataService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project') ?? '')),
      filterNullish()
    );
  }

  public updateProject(project: IdentifiableModel<ProjectModel>) {
    this.data.updateProject(project)?.subscribe();
  }
}
