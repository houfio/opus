import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.scss']
})
export class ProjectBacklogComponent {
  public readonly project$ = this.pageService.getProjectBacklog(this.route.parent!.paramMap);

  public constructor(private route: ActivatedRoute, private pageService: PageService) {
  }
}
