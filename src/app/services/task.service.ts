import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  public getTasks(project: IdentifiableModel<ProjectModel>, sprint?: IdentifiableModel<SprintModel>) {
    return this.store.collection('projects').doc(project.id).collection<TaskModel>(
      'tasks',
      (ref) => sprint ? ref.where('sprint', '==', sprint.id) : ref
    ).valueChanges({
      idField: 'id'
    });
  }
}
