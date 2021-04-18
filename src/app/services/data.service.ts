import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public readonly projects$: Observable<ProjectModel[]>;

  constructor(store: AngularFirestore) {
    this.projects$ = store.collection<ProjectModel>('projects').valueChanges();
  }
}
