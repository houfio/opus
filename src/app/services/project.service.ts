import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { defer, EMPTY, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public constructor(private store: AngularFirestore, private auth: AuthService) {
  }

  public getProjects(userOf?: boolean, archived = false) {
    const user = this.auth.user;

    if (userOf !== undefined && !user) {
      return of([]);
    }

    return this.store.collection<ProjectModel>(
      'projects',
      (ref) => {
        let query = ref as any;

        if (userOf) {
          query = query.where('users', 'array-contains', user!.uid);
        }

        if (!archived) {
          query = query.where('archived', '==', false);
        }

        return query;
      }
    ).valueChanges({
      idField: 'id'
    }).pipe(
      map((projects) => userOf !== false ? projects : projects.filter(
        (project) => !project.users.includes(user!.uid)
      ))
    );
  }

  public createProject(name: string, description: string) {
    const user = this.auth.user;

    if (!user) {
      return EMPTY;
    }

    const batch = this.store.firestore.batch();
    const document = this.store.firestore.collection('projects').doc();

    batch.set(document, {
      name,
      description,
      owner: user.uid,
      archived: false,
      users: [
        user.uid
      ]
    });

    batch.set(document.collection('users').doc(user.uid), {
      name: user.displayName ?? 'Anonymous',
      role: 'Owner'
    });

    return defer(() => batch.commit());
  }

  public getProject(id: string | null) {
    if (!id) {
      return of(null);
    }

    return this.store.collection<ProjectModel>('projects').doc(id).valueChanges({
      idField: 'id'
    });
  }

  public joinProject(project: IdentifiableModel<ProjectModel>) {
    const user = this.auth.user;

    if (!user) {
      return EMPTY;
    }

    return defer(() => this.store.collection('projects').doc(project.id).collection<UserModel>('users').doc(user.uid).set({
      name: user.displayName ?? 'Anonymous',
      role: 'Member'
    }));
  }

  public updateProject(project: IdentifiableModel<ProjectModel>) {
    return defer(() => this.store.collection('projects').doc(project.id).update({
      name: project.name,
      description: project.description
    }));
  }

  public archiveProject(project: IdentifiableModel<ProjectModel>) {
    return defer(() => this.store.collection('projects').doc(project.id).update({
      archived: !project.archived
    }));
  }
}
