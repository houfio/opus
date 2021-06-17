import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { defer, of } from 'rxjs';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { SprintModel } from '../models/sprint.model';
import { TaskModel } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public constructor(private store: AngularFirestore) {
  }

  private getTaskCollection(project: IdentifiableModel<ProjectModel>, filter?: QueryFn) {
    return this.store.collection('projects').doc(project.id).collection<TaskModel>('tasks', filter);
  }

  public getTasks(project: IdentifiableModel<ProjectModel>, sprint?: IdentifiableModel<SprintModel>) {
    return this.getTaskCollection(
      project,
      (ref) => (sprint ? ref.where('sprint', '==', sprint.id) : ref).orderBy('title')
    ).valueChanges({
      idField: 'id'
    });
  }

  public getTaskBacklog(project: IdentifiableModel<ProjectModel>, sprints: IdentifiableModel<SprintModel>[]) {
    return this.getTaskCollection(
      project,
      (ref) => ref.where('sprint', 'in', [
        ...sprints.map((sprint) => sprint.id),
        ''
      ]).orderBy('title')
    ).valueChanges({
      idField: 'id'
    });
  }

  public createTask(project: IdentifiableModel<ProjectModel>, title: string, sprint?: string) {
    if (!title.trim()) {
      return of(undefined);
    }

    return defer(() => this.getTaskCollection(project).doc().set({
      title,
      description: '',
      state: '',
      points: 0,
      assignee: '',
      sprint: sprint ?? '',
      archived: false
    }));
  }

  public moveTaskToSprint(project: IdentifiableModel<ProjectModel>, task: IdentifiableModel<TaskModel>, sprint?: string) {
    return defer(() => this.getTaskCollection(project).doc(task.id).update({
      sprint: sprint ?? ''
    }));
  }

  public moveTaskToLane(project: IdentifiableModel<ProjectModel>, task: IdentifiableModel<TaskModel>, assignee?: string, state?: string) {
    return defer(() => this.getTaskCollection(project).doc(task.id).update({
      assignee: assignee ?? '',
      state: state ?? ''
    }));
  }
}
