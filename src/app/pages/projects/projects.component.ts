import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel>[]>;

  public constructor(data: DataService) {
    this.projects$ = data.getProjects(false);
  }
}
