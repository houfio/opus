export interface ProjectModel {
  name: string;
  owner: string; // -> UserModel
  users: string[];
  // users: UserModel[];
  // states: StateModel[];
  // tasks: TaskModel[];
  // sprints: SprintModel[];
  archived: boolean;
}
