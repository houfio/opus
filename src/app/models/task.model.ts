export interface TaskModel {
  id: string;
  title: string;
  description: string;
  state: string; // -> StateModel
  finishDate?: Date;
  points: number;
  assignee?: string; // -> UserModel
  sprint?: string; // -> SprintModel
  archived: boolean;
}
