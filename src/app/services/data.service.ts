import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';

import { ProjectModel } from '../models/project.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public readonly projects$: Observable<ProjectModel[]>;

  constructor(private store: AngularFirestore, private auth: AuthService) {
    this.projects$ = store.collection<ProjectModel>('projects').valueChanges();
  }

  public createProject() {
    const batch = this.store.firestore.batch();

    const projects = this.store.firestore.collection('projects');
    const project = projects.doc();

    batch.set(project, {
      name: 'Project',
      owner: this.auth.userId,
      archived: false
    });

    const users = project.collection('users');
    const user = users.doc(this.auth.userId);

    batch.set(user, {
      role: 'Owner'
    });

    return of(batch.commit());
  }
}
