import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import firebase from 'firebase';

import { IdentifiableModel } from '../../models/identifiable.model';
import { SprintModel } from '../../models/sprint.model';
import { StateModel } from '../../models/state.model';
import { TaskModel } from '../../models/task.model';
import { UserModel } from '../../models/user.model';

import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input()
  public activeSprint?: IdentifiableModel<SprintModel>;
  @Input()
  public states!: IdentifiableModel<StateModel>[];
  @Input()
  public tasks!: IdentifiableModel<TaskModel>[];
  @Input()
  public lanes!: IdentifiableModel<UserModel>[];
  
  // public set lanes(value: string[]) {
  //   this.board = ['Unassigned', ...value].reduce((acc, lane) => ({
  //     ...acc,
  //     [lane]: this.board[lane] ?? []
  //   }), {})
  // };

  public board: Record<string, string[]> = {
    Unassigned: [
      'Get to work',
      'Pick up groceries',
      'Go home',
      'Fall asleep'
    ]
  };

  // public get lanes() {
  //   return Object.keys(this.board);
  // }

  public get currSprint() {
    return this.activeSprint;
  }

  public getAssigneeTask(user?: IdentifiableModel<UserModel>, state?: IdentifiableModel<StateModel>) {
    return this.tasks.filter((task) => (task.assignee === user?.id) && task.state === (state?.id ?? ''))
  }

  public get statesInProject() {
    return this.states.sort((a, b) => a.order - b.order)
  }

  public userDrop(event: CdkDragDrop<IdentifiableModel<UserModel>>) {
    console.log(event.container.data);
    console.log(event.previousContainer.data);
    console.log(event.previousIndex);
    console.log(event.currentIndex);
    console.log(event.previousContainer === event.container);
  }

  public taskDrop(event: CdkDragDrop<IdentifiableModel<TaskModel>[], any>) {
    console.log(event);
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  public getDate(timeStamp?: Timestamp) {
    return timeStamp?.toDate()?.toLocaleDateString('nl-NL');
  }

  public resolveUser(assignee?: string) {
    return this.lanes.filter((user) => user.id === assignee)[0]?.name ?? 'unassigned';
  }
}
