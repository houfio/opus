import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public project?: IdentifiableModel<ProjectModel>;

  constructor(route: ActivatedRoute, data: DataService) {
    route.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project') ?? ''))
    ).subscribe((project) => {
      this.project = project;
    });
  }
}
