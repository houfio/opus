import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { filterNullish } from '../../operators/filter-nullish';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnDestroy {
  public projects$: Observable<IdentifiableModel<ProjectModel>>;

  private subscription: Subscription;

  public constructor(route: ActivatedRoute, router: Router, auth: AuthService, data: DataService) {
    this.projects$ = route.parent!.paramMap.pipe(
      switchMap((params) => data.getProject(params.get('project') ?? '')),
      filterNullish()
    );

    this.subscription = this.projects$.subscribe((project) => {
      if (project.owner !== auth.user?.uid) {
        router.navigate(['/']);
      }
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
