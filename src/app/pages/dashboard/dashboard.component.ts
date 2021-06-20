import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { PageService } from '../../services/page.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public readonly projects$ = this.pageService.getDashboard();
  public readonly icon = faTrash;

  public showArchived = false;

  public constructor(private pageService: PageService, private projectService: ProjectService, private notifierService: NotifierService) {
  }

  public hasArchived(projects: IdentifiableModel<ProjectModel & { user: string }>[]) {
    return projects.some((project) => project.archived && project.owner === project.user);
  }

  public filterProjects<T extends ProjectModel & { user: string }>(projects: T[], archived: boolean) {
    return projects.filter((project) => project.archived === archived && (!archived || project.owner === project.user));
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.archiveProject(project)
      .subscribe(() => this.notifierService.notify('success', 'Project successfully unarchived'));
  }
}
