import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { filterNullish } from '../../operators/filter-nullish';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    userData: (IdentifiableModel<UserModel> & {
      accepted: boolean
    })[]
  }>;
  public checked = faCheck;
  public unchecked = faTimes;

  public constructor(route: ActivatedRoute, private router: Router, private projectService: ProjectService, private userService: UserService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        userService.getUsers(project)
      ])),
      map(([project, users]) => ({
        ...project,
        userData: users.map((user) => ({
          ...user,
          accepted: project.users.indexOf(user.id) !== -1
        }))
      }))
    );
  }

  public updateProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.updateProject(project).subscribe();
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.archiveProject(project).subscribe(() => this.router.navigate(['/']));
  }

  public updateUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    this.userService.updateUser(project, user).subscribe();
  }

  public deleteUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    this.userService.deleteUser(project, user).subscribe();
  }
}
