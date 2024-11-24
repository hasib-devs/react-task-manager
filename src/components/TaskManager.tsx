import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskProvider } from "../contexts/task-context";
import TaskBoard from "./TaskBoard";

const TaskManager = () => {
  return (
    <TaskProvider>
      <DndProvider backend={HTML5Backend}>
        <TaskBoard />
      </DndProvider>
    </TaskProvider>
  );
};

export default TaskManager;
