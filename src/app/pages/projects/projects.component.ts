import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
  public project = {
    name: '',
    description: ''
  };

  public constructor(private router: Router, private data: DataService) {
    this.projects$ = data.getProjects(false);
  }

  public createProject() {
    this.data.createProject(this.project.name, this.project.description)
      ?.subscribe(() => this.router.navigate(['']));
  }

  public joinProject(project: IdentifiableModel<ProjectModel>) {
    this.data.joinProject(project)
      ?.subscribe(() => this.router.navigate(['']));
  }
}
