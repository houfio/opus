import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { SprintModel } from '../../models/sprint.model';

@Component({
  selector: 'app-sprint-overlay',
  templateUrl: './sprint-overlay.component.html',
  styleUrls: ['./sprint-overlay.component.scss']
})
export class SprintOverlayComponent {
  @Input()
  public sprint!: IdentifiableModel<SprintModel>;
  @Output()
  public dismiss = new EventEmitter();
}
