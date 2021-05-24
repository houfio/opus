import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { defer, of } from 'rxjs';

import { IdentifiableModel } from '../models/identifiable.model';
import { ProjectModel } from '../models/project.model';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public constructor(private store: AngularFirestore) {
  }

  private getUserCollection(project: IdentifiableModel<ProjectModel>) {
    return this.store.collection('projects').doc(project.id).collection<UserModel>('users');
  }

  public getUsers(project: IdentifiableModel<ProjectModel>) {
    return this.getUserCollection(project).valueChanges({
      idField: 'id'
    });
  }

  public getOwner(project: IdentifiableModel<ProjectModel>) {
    if (project.archived) {
      return of(undefined);
    }

    return this.getUserCollection(project).doc(project.owner).valueChanges({
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
