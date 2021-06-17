import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import type { QueryFn } from '@angular/fire/firestore/interfaces';
import { defer, of } from 'rxjs';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { SprintModel } from '../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  public constructor(private store: AngularFirestore) {
  }

  private getSprintCollection(project: IdentifiableModel<ProjectModel>, query?: QueryFn) {
    return this.store.collection('projects').doc(project.id).collection<SprintModel>('sprints', query);
  }

  public getSprints(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(project).valueChanges({
      idField: 'id'
    });
  }

  public getSprintBacklog(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(
      project,
      (ref) => ref.where('archived', '==', false).orderBy('name')
    ).valueChanges({
      idField: 'id'
    });
  }

  public getCurrentSprint(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(project).doc(project.currentSprint).valueChanges({
      idField: 'id'
    });
  }

  public createSprint(project: IdentifiableModel<ProjectModel>, name: string) {
    if (!name.trim()) {
      return of(undefined);
    }

    return defer(() => this.getSprintCollection(project).doc().set({
      name,
      description: '',
      archived: false
    }));
  }
}
