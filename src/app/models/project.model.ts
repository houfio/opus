import { SprintModel } from './sprint.model';
import { StateModel } from './state.model';
import { TaskModel } from './task.model';
import { UserModel } from './user.model';

export interface ProjectModel {
  id: string;
  name: string;
  users: UserModel[];
  states: StateModel[];
  tasks: TaskModel[];
  sprints: SprintModel[];
  archived: boolean;
}
