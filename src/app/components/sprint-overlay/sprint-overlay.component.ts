import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import firebase from 'firebase/app';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-sprint-overlay',
  templateUrl: './sprint-overlay.component.html',
  styleUrls: ['./sprint-overlay.component.scss']
})
export class SprintOverlayComponent implements OnInit {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public sprint!: IdentifiableModel<SprintModel>;
  @Output()
  public dismiss = new EventEmitter();

  public data!: {
    id: string,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    archived: boolean
  };

  public constructor(private sprintService: SprintService) {
  }

  public ngOnInit() {
    this.data = {
      ...this.sprint,
      startDate: this.sprint.startDate.toDate(),
      endDate: this.sprint.endDate.toDate()
    };

    console.log(this.data);
  }

  public getOptions(start: boolean) {
    return {
      inputClass: 'input',
      ...start ? {
        maxDate: this.data.endDate
      } : {
        minDate: this.data.startDate
      }
    };
  }

  public updateSprint() {
    this.sprintService.updateSprint(this.project, {
      ...this.data,
      startDate: firebase.firestore.Timestamp.fromDate(this.data.startDate),
      endDate: firebase.firestore.Timestamp.fromDate(this.data.endDate)
    }).subscribe(() => this.dismiss.emit());
  }
}
