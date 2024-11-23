import { useState } from "react";
import { type TaskType, TaskStatus } from "../types";
import TaskCard from "../components/TaskCard";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const TaskBoard = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      title: "Task One",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Todo,
    },
    {
      id: 2,
      title: "Task Two",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Completed,
    },
    {
      id: 3,
      title: "Task Three",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Todo,
    },
    {
      id: 4,
      title: "Task Four",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.InProgress,
    },
  ]);

  function getTasksByStatus(status: TaskStatus) {
    return tasks.filter((task) => task.status === status);
  }

  function moveTask(task: TaskType, status: TaskStatus) {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status } : t
    );
    setTasks(newTasks);
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto px-5 py-10 bg-white">
        <h1 className="text-4xl text-center mb-10">Task Manager</h1>

        <div className="grid grid-cols-3 bg-gray-200 border border-gray-200">
          {/* Card Todo */}
          {Object.values(TaskStatus).map((status) => {
            return (
              <TaskCard
                key={status}
                status={status}
                data={getTasksByStatus(status)}
                moveTask={moveTask}
              />
            );
          })}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
