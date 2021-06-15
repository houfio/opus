import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { defer, from, of } from 'rxjs';
import { isNumeric } from 'rxjs/internal-compatibility';

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
      (ref) => sprint ? ref.where('sprint', '==', sprint.id) : ref
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
      ])
    ).valueChanges({
      idField: 'id'
    });
  }

  public createTask(project: IdentifiableModel<ProjectModel>, title: string, points: number, sprint?: string) {
    if (!title || !isNumeric(points) || points < 0) {
      return of(undefined)
    }

    const newTask = this.getTaskCollection(project).doc().set({
      title,
      description: '',
      state: '',
      points,
      sprint: sprint ?? '',
      archived: false
    });

    return from(newTask);
  }

  public moveTaskToSprint(project: IdentifiableModel<ProjectModel>, task: IdentifiableModel<TaskModel>, sprint?: string) {
    return defer(() => this.getTaskCollection(project).doc(task.id).update({
      sprint: sprint ?? ''
    }));
  }
}
