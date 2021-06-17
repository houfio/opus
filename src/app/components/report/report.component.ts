import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { eachDayOfInterval, format } from 'date-fns';
import { Color, Label } from 'ng2-charts';

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
  public activeSprint!: IdentifiableModel<SprintModel>;
  @Input()
  public states!: IdentifiableModel<StateModel>[];
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];

  public ngOnInit(): void {
    const days = eachDayOfInterval({
        start: this.activeSprint.startDate.toDate(),
        end: this.activeSprint.endDate.toDate()
      }).map((date) => format(date, "MMM dd, yyyy"));
    console.log('X-Axis, days:', days);
    console.log('Expected points:', this.getExpectedPoints());
  }

  public getDataSet() {
    return [32, 32, 32, 32, 32, 28, 28, 18, 18]; // NOTE: Need a way to calculate points per getDates()
  }

  public getSprintDates() {
    if (!this.activeSprint) { // NOTE: Temp fallback. Why is activeSprint empty here but not in ngOnInit()?
      return [
        "Jan 1",
        "Jan 2",
        "Jan 3",
        "Jan 4",
        "Jan 5",
        "Jan 6",
        "Jan 7",
        "Jan 8",
        "Jan 9",
        "Jan 10",
        "Jan 11",
        "Jan 12",
        "Jan 13",
        "Jan 14"
      ];
    }
    return eachDayOfInterval({
      start: this.activeSprint.startDate.toDate(),
      end: this.activeSprint.endDate.toDate()
    }).map((date) => format(date, "MMM dd, yyyy"));
  }

  public getMaxPoints() {
    return this.getDataSet()[0];
  }

  public getExpectedPoints() {
    return [this.getMaxPoints(), ...this.getSprintDates().map((_, i) => this.calculateStep(i + 1))];
  }

  private calculateStep(step: number) {
    const stepSize = this.getMaxPoints() / this.getSprintDates().length;
    return +(this.getMaxPoints() - (stepSize * step)).toFixed(2);
  }

  public getActiveDate() {
    return this.getSprintDates()[this.getDataSet().length - 1];
  }

  public lineChartData: ChartDataSets[] = [
    { data: this.getDataSet(), label: 'Story points' },
    { data: this.getExpectedPoints(), label: 'Expected' },
  ];
  public lineChartLabels: Label[] = this.getSprintDates();
  public lineChartOptions: ChartOptions = {
    responsive: true,
    elements: {
      line: {
        tension: 0
      }
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: this.getActiveDate(),
          borderColor: 'rgba(77, 83, 96, 0.3)',
          borderWidth: 2,
          borderDash: [10],
          label: {
            enabled: true,
            fontColor: 'white',
            content: 'Today'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    {
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'transparent',
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#4D5360FF'
    },

  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
}
