import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProjectModel } from '../models/project.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public readonly projects$: Observable<(ProjectModel & { id: string })[]>;

  public constructor(private store: AngularFirestore, private auth: AuthService) {
    this.projects$ = store.collection<ProjectModel>('projects').valueChanges({
      idField: 'id'
    }).pipe(
      map((projects) => projects.filter((p) => p.owner === auth.user?.uid))
    );
  }

  public createProject(name: string) {
    const user = this.auth.user;

    if (!user) {
      return;
    }

    const batch = this.store.firestore.batch();
    const project = this.store.firestore.collection('projects').doc();

    batch.set(project, {
      name,
      owner: user.uid,
      archived: false
    });

    const users = project.collection('users');

    batch.set(users.doc(user.uid), {
      name: user.displayName ?? 'Anonymous',
      role: 'Owner'
    });

    return of(batch.commit());
  }

  public getProject(id: string) {
    return this.store.collection<ProjectModel>('projects').doc(id).valueChanges({
      idField: 'id'
    });
  }
}
