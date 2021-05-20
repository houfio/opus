import { Component } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { UserModel } from '../../models/user.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  public projects$: Observable<IdentifiableModel<ProjectModel & {
    ownerData?: IdentifiableModel<UserModel>
  }>[]>;

  public constructor(data: DataService) {
    this.projects$ = data.getProjects(true).pipe(
      switchMap((projects) => combineLatest(projects.map((project) => combineLatest([
        of(project),
        data.getOwner(project)
      ])))),
      map((projects) => projects.map(([project, ownerData]) => ({
        ...project,
        ownerData
      })))
    );
  }
}
