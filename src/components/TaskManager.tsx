import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TaskProvider } from "../contexts/task-context";
import TaskBoard from "./TaskBoard";

const TaskManager = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TaskProvider>
        <TaskBoard />
      </TaskProvider>
    </DndProvider>
  );
};

export default TaskManager;
