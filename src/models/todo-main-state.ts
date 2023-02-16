import { Task } from "./tasks";

export interface TodoMainState {
  tasksLeft: number;
  tasks: Task[];
}