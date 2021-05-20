import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { StateModel } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public constructor(private store: AngularFirestore) {
  }

  public getStates(project: IdentifiableModel<ProjectModel>) {
    return this.store.collection('projects').doc(project.id).collection<StateModel>('states').valueChanges({
      idField: 'id'
    });
  }
}
