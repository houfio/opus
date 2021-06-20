import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageService } from '../../services/page.service';

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})
export class ProjectBoardComponent {
  public readonly project$ = this.pageService.getProjectDetails(this.route.parent!.paramMap);

  public constructor(private route: ActivatedRoute, private pageService: PageService) {
  }
}
