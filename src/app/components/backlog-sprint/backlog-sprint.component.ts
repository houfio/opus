import { animateChild, query, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { compareDesc, format, startOfToday } from 'date-fns';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { SprintService } from '../../services/sprint.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-backlog-sprint',
  templateUrl: './backlog-sprint.component.html',
  styleUrls: ['./backlog-sprint.component.scss'],
  animations: [
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [
        query('@*', animateChild())
      ])
    ])
  ]
})
export class BacklogSprintComponent implements AfterViewInit {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public sprint?: IdentifiableModel<SprintModel>;
  @Input()
  public index?: number;
  @Input()
  public sprints?: IdentifiableModel<SprintModel>[];
  @Input()
  public states!: IdentifiableModel<StateModel>[];
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];
  @ViewChild('input', { read: ElementRef })
  public input?: ElementRef<HTMLElement>;

  public details?: IdentifiableModel<TaskModel>;
  public sprintDetails?: IdentifiableModel<SprintModel>;
  public data = {
    open: false,
    title: ''
  };

  public constructor(private cd: ChangeDetectorRef, private sprintService: SprintService, private taskService: TaskService) {
  }

  @HostBinding('class.current')
  public get current() {
    return this.sprint && this.sprint.id === this.project.currentSprint;
  }

  public get next() {
    return !this.project.currentSprint && !this.index;
  }

  @HostBinding('class.backlog')
  public get backlog() {
    return !this.sprint;
  }

  public get tasksInSprint() {
    return this.tasks.filter((task) => task.sprint === (this.sprint?.id ?? ''));
  }

  public get empty() {
    return !this.tasksInSprint.length;
  }

  public get points() {
    return this.tasksInSprint.reduce((acc, { points }) => acc + points, 0)
  }

  public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public setOpen(open: boolean) {
    this.data = {
      open,
      title: ''
    };

    if (open) {
      setTimeout(() => this.input?.nativeElement.focus());
    }
  }

  public createSprint() {
    if (this.sprints === undefined) {
      return;
    }

    const date = this.sprints.map((s) => s.endDate.toDate()).sort(compareDesc)[0] ?? startOfToday();
    const name = format(date, 'MMM d');

    this.sprintService.createSprint(this.project, `Sprint (${name})`, date).subscribe();
  }

  public createTask() {
    this.taskService.createTask(this.project, this.data.title, this.sprint?.id).subscribe();
    this.setOpen(false);
  }

  public onDrop(event: CdkDragDrop<IdentifiableModel<TaskModel>>) {
    this.taskService.moveTaskToSprint(this.project, event.item.data, this.sprint?.id).subscribe();
  }

  public startSprint() {
    if (!this.sprint) {
      return;
    }

    this.sprintService.startSprint(this.project, this.sprint).subscribe();
  }

  public finishSprint() {
    if (!this.sprint) {
      return;
    }

    this.sprintService.finishSprint(this.project, this.sprint).subscribe();
  }
}
