import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
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

  public constructor(private router: Router, private projectService: ProjectService, private notifierService: NotifierService) {
    this.projects$ = projectService.getProjects(false);
  }

  public createProject() {
    this.projectService.createProject(this.data.name, this.data.description).subscribe(() => {
      this.notifierService.notify('success', 'Project successfully created');
      this.router.navigate(['']);
    });
  }

  public joinProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.joinProject(project).subscribe(() => {
      this.notifierService.notify('success', 'Request successfully sent');
      this.router.navigate(['']);
    });
  }
}
