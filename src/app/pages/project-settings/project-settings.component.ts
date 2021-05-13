import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { filterNullish } from '../../operators/filter-nullish';
import { DataService } from '../../services/data.service';

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

  public constructor(route: ActivatedRoute, private data: DataService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        data.getUsers(project)
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
    this.data.updateProject(project)?.subscribe();
  }
}
