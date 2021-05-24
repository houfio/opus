import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel & {
    user: string,
    ownerData?: IdentifiableModel<UserModel>
  }>[]>;
  public icon = faTrash;
  public showArchived = false;

  public constructor(authService: AuthService, private projectService: ProjectService, userService: UserService) {
    this.projects$ = projectService.getProjects(true, true).pipe(
      switchMap((projects) => combineLatest(projects.map((project) => combineLatest([
        of(project),
        authService.user$,
        userService.getOwner(project)
      ])))),
      map((projects) => projects.map(([project, user, ownerData]) => ({
        ...project,
        user: user?.uid ?? '',
        ownerData
      })))
    );
  }

  public hasArchived(projects: IdentifiableModel<ProjectModel & { user: string }>[]) {
    return projects.some((project) => project.archived && project.owner === project.user);
  }

  public filterProjects<T extends ProjectModel & { user: string }>(projects: T[], archived: boolean) {
    return projects.filter((project) => project.archived === archived && (!archived || project.owner === project.user));
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.archiveProject(project).subscribe();
  }
}
