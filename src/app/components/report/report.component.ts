import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { eachDayOfInterval, format, isAfter, isBefore, startOfDay, startOfTomorrow } from 'date-fns';

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
        display: false,
      },
      tooltip: {
        displayColors: false,
        callbacks: {
          label: ({ dataset , parsed }) => {
            return `-${this.getDifference(parsed.y, dataset.data![parsed.x - 1] as number)} points`
          }
        }
      }
    }
  };

  public ngOnInit() {
    const days = this.getDays();
    const points = this.getTotalPoints();
    const tomorrow = startOfTomorrow();
    const done = days.filter((day) => isBefore(day, tomorrow));
    const step = points / (days.length - 1);
    const pointData = done.map((day) => points - this.getFinishedPoints(day));
    const hitData = pointData.map((point, i) => Math.min(this.getDifference(point, pointData[i - 1]) * 1.5, 16));

    this.data.labels = days.map((date) => format(date, 'MMM d'));
    this.data.datasets = [{
      data: pointData,
      borderColor: '#ffba05',
      pointRadius: hitData,
      pointHitRadius: hitData,
      pointHoverRadius: hitData,
    }, {
      data: days.map((_, i) => points - step * i),
      backgroundColor: 'rgba(0, 0, 0, .25)',
      borderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 0,
      fill: 'origin'
    }];
  }

  private getDays() {
    return eachDayOfInterval({
      start: this.sprint.startDate.toDate(),
      end: this.sprint.endDate.toDate()
    });
  }

  private getTotalPoints() {
    return this.tasks.reduce((acc, { points }) => acc + points, 0);
  }

  private getFinishedPoints(date: Date) {
    return this.tasks.reduce((acc, { finishDate, points }) => {
      if (!finishDate || isAfter(startOfDay(finishDate.toDate()), date)) {
        return acc;
      }

      return acc + points;
    }, 0);
  }

  private getDifference(current: number, previous?: number) {
    if (!previous) {
      return 0;
    }

    return previous - current;
  }
}
