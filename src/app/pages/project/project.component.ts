import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
  public readonly project$ = this.pageService.getProject(this.route.paramMap);

  public constructor(private route: ActivatedRoute, private pageService: PageService) {
  }
}
