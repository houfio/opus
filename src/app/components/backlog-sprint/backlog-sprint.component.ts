import { animate, state, style, transition, trigger } from '@angular/animations';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { TaskModel } from '../../models/task.model';
import { UserModel } from '../../models/user.model';
import { TaskService } from '../../services/task.service';

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
  @ViewChild('taskInput', { read: ElementRef })
  public taskInput?: ElementRef<HTMLElement>;
  public data = {
    title: ''
  };
  public isOpen = false;

  public constructor(private cd: ChangeDetectorRef, private taskService: TaskService) {
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

  public setOpen(state: boolean) {
    this.isOpen = state;

    if (state) {
      setTimeout(() => {
        this.taskInput?.nativeElement.focus();
      });
    }
  }

  public createTask() {
    this.taskService.createTask(this.project, this.data.title, this.sprint?.id).subscribe();
    this.isOpen = false;
    this.data.title = '';
  }

  public openDetails(task: IdentifiableModel<TaskModel>) {
    console.log('Open details for', task.title);
    console.log('Info', task);
  }

  public onDrop(event: CdkDragDrop<IdentifiableModel<TaskModel>>) {
    this.taskService.moveTaskToSprint(this.project, event.item.data, this.sprint?.id).subscribe();
  }
}
