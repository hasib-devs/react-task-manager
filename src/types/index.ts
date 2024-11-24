export enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Completed = "completed",
}

export type TaskType = {
  id: number;
  name: string;
  description: string;
  status: TaskStatus;
};

export type TaskCreateType = Pick<TaskType, "name" | "description">;
