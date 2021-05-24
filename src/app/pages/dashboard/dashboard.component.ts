import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel & {
    ownerData?: IdentifiableModel<UserModel>
  }>[]>;
  public icon = faTrash;
  public showArchived = false;

  public constructor(private projectService: ProjectService, userService: UserService) {
    this.projects$ = projectService.getProjects(true, true).pipe(
      switchMap((projects) => combineLatest(projects.map((project) => combineLatest([
        of(project),
        userService.getOwner(project)
      ])))),
      map((projects) => projects.map(([project, ownerData]) => ({
        ...project,
        ownerData
      })))
    );
  }

  public hasArchived(projects: IdentifiableModel<ProjectModel>[]) {
    return projects.some((project) => project.archived);
  }

  public filterProjects<T extends { archived: boolean }>(projects: T[], archived: boolean) {
    return projects.filter((project) => project.archived === archived);
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.archiveProject(project).subscribe();
  }
}
