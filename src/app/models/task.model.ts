import firebase from 'firebase/app';

import Timestamp = firebase.firestore.Timestamp;

export interface TaskModel {
  title: string;
  description: string;
  state: string; // -> StateModel
  order: number;
  finishDate?: Timestamp;
  points: number;
  assignee?: string; // -> UserModel
  sprint?: string; // -> SprintModel
  archived: boolean;
}
