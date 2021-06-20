import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NotifierService } from 'angular-notifier';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { PageService } from '../../services/page.service';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent {
  public readonly project$ = this.pageService.getProjectUsers(this.route.parent!.paramMap);
  public readonly checked = faCheck;
  public readonly unchecked = faTimes;

  public constructor(private route: ActivatedRoute, private router: Router, private pageService: PageService, private projectService: ProjectService, private userService: UserService, private notifierService: NotifierService) {
  }

  public updateProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.updateProject(project)
      .subscribe(() => this.notifierService.notify('success', 'Project successfully updated'));
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    this.projectService.archiveProject(project).subscribe(() => {
      this.notifierService.notify('success', 'Project successfully archived');
      this.router.navigate(['/']);
    });
  }

  public updateUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    this.userService.updateUser(project, user)
      .subscribe(() => this.notifierService.notify('success', 'User successfully updated'));
  }

  public deleteUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    this.userService.deleteUser(project, user)
      .subscribe(() => this.notifierService.notify('success', 'User successfully deleted'));
  }
}
