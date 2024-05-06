import { Task } from "api";

interface TaskData {
    visited: boolean;
    task: Task;
    order: number;
    depth: number;
    hasChild: boolean;
  }

export default TaskData;