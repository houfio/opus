export interface ProjectModel {
  id: string;
  name: string;
  owner: string; // -> UserModel
  // users: UserModel[];
  // states: StateModel[];
  // tasks: TaskModel[];
  // sprints: SprintModel[];
  archived: boolean;
}
