import firebase from 'firebase/app';

import Timestamp = firebase.firestore.Timestamp;

export interface SprintModel {
  name: string;
  description: string;
  startDate?: Timestamp;
  endDate?: Timestamp;
  archived: boolean;
}
