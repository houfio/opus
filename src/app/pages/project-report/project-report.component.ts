import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent {
  public readonly project$ = this.pageService.getProjectDetails(this.route.parent!.paramMap);

  public constructor(private route: ActivatedRoute, private pageService: PageService) {
  }
}
