import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { SprintModel } from '../models/sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  public constructor(private store: AngularFirestore) {
  }

  private getSprintCollection(project: IdentifiableModel<ProjectModel>) {
    return this.store.collection('projects').doc(project.id).collection<SprintModel>('sprints');
  }

  public getSprints(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(project).valueChanges({
      idField: 'id'
    });
  }

  public getSprintBacklog(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(project).valueChanges({
      idField: 'id'
    }).pipe(
      map((sprints) => sprints.filter((sprint) => !sprint.endDate || sprint.endDate.toDate() > new Date()))
    );
  }

  public getCurrentSprint(project: IdentifiableModel<ProjectModel>) {
    return this.getSprintCollection(project).doc(project.currentSprint).valueChanges({
      idField: 'id'
    });
  }
}
