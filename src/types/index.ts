export enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Completed = "completed",
}

export type TaskType = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};
