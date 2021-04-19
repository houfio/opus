export interface TaskModel {
  id: string;
  title: string;
  description: string;
  state: string; // -> StateModel
  finishDate?: Date;
  points: number;
  owner?: string; // -> UserModel
  sprint?: string; // -> SprintModel
  archived: boolean;
}
