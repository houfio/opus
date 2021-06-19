import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import firebase from 'firebase/app';
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

  public getTasks(project: IdentifiableModel<ProjectModel>, sprints?: IdentifiableModel<SprintModel>[]) {
    const ids = sprints ? [...sprints.map((sprint) => sprint.id), ''] : [project.currentSprint];

    return this.getTaskCollection(
      project,
      (ref) => ref.where('sprint', 'in', ids).orderBy('title')
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

  public moveTaskToState(project: IdentifiableModel<ProjectModel>, task: IdentifiableModel<TaskModel>, assignee?: string, state?: string, finished?: boolean) {
    return defer(() => this.getTaskCollection(project).doc(task.id).update({
      assignee: assignee ?? '',
      state: state ?? '',
      finishDate: finished ? firebase.firestore.Timestamp.fromDate(new Date()) : firebase.firestore.FieldValue.delete() as any
    }));
  }
}
