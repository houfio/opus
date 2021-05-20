export interface ProjectModel {
  name: string;
  description: string;
  owner: string; // -> UserModel
  users: string[];
  currentSprint: string; // -> SprintModel
  // users: UserModel[];
  // states: StateModel[];
  // tasks: TaskModel[];
  // sprints: SprintModel[];
  archived: boolean;
}
