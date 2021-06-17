import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { eachDayOfInterval } from 'date-fns'
import { Color, Label } from 'ng2-charts';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { filterNullish } from '../../operators/filter-nullish';
import { ProjectService } from '../../services/project.service';
import { SprintService } from '../../services/sprint.service';
import { StateService } from '../../services/state.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-project-report',
  templateUrl: './project-report.component.html',
  styleUrls: ['./project-report.component.scss']
})
export class ProjectReportComponent {
  public project$: Observable<IdentifiableModel<ProjectModel> & {
    states: IdentifiableModel<StateModel>[],
    activeSprint?: IdentifiableModel<SprintModel>,
    tasks: IdentifiableModel<TaskModel>[],
  }>;

  public constructor(route: ActivatedRoute, projectService: ProjectService, stateService: StateService, taskService: TaskService, sprintService: SprintService) {
    this.project$ = route.parent!.paramMap.pipe(
      switchMap((params) => projectService.getProject(params.get('project'))),
      filterNullish(),
      switchMap((project) => combineLatest([
        of(project),
        stateService.getStates(project),
        taskService.getTasks(project),
        sprintService.getCurrentSprint(project)
      ])),
      map(([project, states, tasks, activeSprint]) => ({
        ...project,
        states,
        activeSprint,
        tasks: tasks.filter((task) => task.sprint === project.currentSprint),
      }))
    );
  }
}
