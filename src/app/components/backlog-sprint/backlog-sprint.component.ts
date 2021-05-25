import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-backlog-sprint',
  templateUrl: './backlog-sprint.component.html',
  styleUrls: ['./backlog-sprint.component.scss'],
  animations: [
    trigger('fallback', [
      state('true', style({
        opacity: '1'
      })),
      state('false', style({
        opacity: '0'
      })),
      transition('* <=> *', [
        animate('.25s ease')
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
  public tasks!: IdentifiableModel<TaskModel>[];
  @ViewChild('fallback', { read: ElementRef })
  public fallback?: ElementRef<HTMLElement>;

  public constructor(private cd: ChangeDetectorRef) {
  }

  @HostBinding('class.current')
  public get current() {
    return this.sprint && this.sprint.id === this.project.currentSprint
  }

  @HostBinding('class.backlog')
  public get backlog() {
    return !this.sprint;
  }

  public get empty() {
    return !this.tasksInSprint.length;
  }

  public get minHeight() {
    return this.fallback?.nativeElement.offsetHeight;
  }

  public get tasksInSprint() {
    return this.tasks.filter((task) => task.sprint === (this.sprint?.id ?? ''));
  }

  public ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public onDrop(event: unknown) {
    console.log(event);
  }
}
