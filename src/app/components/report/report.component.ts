import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { eachDayOfInterval, endOfDay, format, isAfter, isBefore, startOfTomorrow } from 'date-fns';

import { IdentifiableModel } from '../../models/identifiable.model';
import { ProjectModel } from '../../models/project.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
  @Input()
  public project!: IdentifiableModel<ProjectModel>;
  @Input()
  public sprint!: IdentifiableModel<SprintModel>;
  @Input()
  public states!: IdentifiableModel<StateModel>[];
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];

  public data: ChartConfiguration['data'] = {
    datasets: []
  };

  public options: ChartConfiguration['options'] = {
    animation: {
      duration: 0
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  public ngOnInit() {
    const days = this.getDays();
    const points = this.getTotalPoints();
    const tomorrow = startOfTomorrow();
    const done = days.filter((day) => isBefore(day, tomorrow));
    const step = points / (days.length - 1);

    this.data.labels = days.map((date) => format(date, 'MMM d'));
    this.data.datasets.push({
      data: done.map((day) => points - this.getFinishedPoints(day)),
      borderColor: '#ffba05',
      pointRadius: 0,
      pointHitRadius: 0
    });
    this.data.datasets.push({
      data: days.map((_, i) => points - step * i),
      backgroundColor: 'rgba(0 ,0 ,0 , .25)',
      borderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      fill: 'origin'
    });
  }

  public getDays() {
    return eachDayOfInterval({
      start: this.sprint.startDate.toDate(),
      end: this.sprint.endDate.toDate()
    });
  }

  public getTotalPoints() {
    return this.tasks.reduce((acc, { points }) => acc + points, 0);
  }

  public getFinishedPoints(date: Date) {
    return this.tasks.reduce((acc, { finishDate, points }) => {
      if (!finishDate || isAfter(endOfDay(finishDate.toDate()), date)) {
        return acc;
      }

      return acc + points;
    }, 0);
  }
}
