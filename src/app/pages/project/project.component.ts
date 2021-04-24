import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public project?: IdentifiableModel<ProjectModel>;
  public users: IdentifiableModel<UserModel>[] = [];

  public get lanes() {
    return this.users.map((u) => u.name);
  }

  public constructor(route: ActivatedRoute, data: DataService) {
    route.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project') ?? '')),
      tap((project) => this.project = project),
      switchMap((project) => project ? data.getUsers(project) : of([]))
    ).subscribe((users) => {
      this.users = users;
    });
  }
}
