import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel>[]>;
  public data = {
    name: '',
    description: ''
  };

  public constructor(private router: Router, private project: ProjectService) {
    this.projects$ = project.getProjects(false);
  }

  public createProject() {
    this.project.createProject(this.data.name, this.data.description).subscribe(() => this.router.navigate(['']));
  }

  public joinProject(project: IdentifiableModel<ProjectModel>) {
    this.project.joinProject(project).subscribe(() => this.router.navigate(['']));
  }
}
