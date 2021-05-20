import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { defer, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public constructor(private store: AngularFirestore, private auth: AuthService) {
  }

  public getProjects(userOf?: boolean) {
    const user = this.auth.user;

    if (userOf !== undefined && !user) {
      return of([]);
    }

    return this.store.collection<ProjectModel>(
      'projects',
      (ref) => userOf ? ref.where('users', 'array-contains', user!.uid) : ref
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
      return;
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

  private getUserCollection(project: IdentifiableModel<ProjectModel>) {
    return this.store.collection('projects').doc(project.id).collection<UserModel>('users');
  }

  public joinProject(project: IdentifiableModel<ProjectModel>) {
    const user = this.auth.user;

    if (!user) {
      return;
    }

    return defer(() => this.getUserCollection(project).doc(user.uid).set({
      name: user.displayName ?? 'Anonymous',
      role: 'Member'
    }));
  }

  public updateProject(project: IdentifiableModel<ProjectModel>) {
    const user = this.auth.user;

    if (!user || project.owner !== user.uid) {
      return;
    }

    return defer(() => this.store.collection('projects').doc(project.id).update({
      name: project.name,
      description: project.description
    }));
  }

  public getUsers(project: IdentifiableModel<ProjectModel>) {
    return this.getUserCollection(project).valueChanges({
      idField: 'id'
    });
  }

  public updateUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    const batch = this.store.firestore.batch();
    const document = this.store.firestore.collection('projects').doc(project.id);

    if (project.users.indexOf(user.id) === -1) {
      batch.update(document, {
        users: [
          ...project.users,
          user.id
        ]
      });
    }

    batch.set(document.collection('users').doc(user.id), {
      name: user.name,
      role: user.role
    });

    return defer(() => batch.commit());
  }

  public deleteUser(project: IdentifiableModel<ProjectModel>, user: IdentifiableModel<UserModel>) {
    const batch = this.store.firestore.batch();
    const document = this.store.firestore.collection('projects').doc(project.id);

    batch.update(document, {
      users: project.users.filter((id) => id !== user.id)
    });

    batch.delete(document.collection('users').doc(user.id));

    return defer(() => batch.commit());
  }
}
