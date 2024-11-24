import { createContext, FC, ReactNode, useState } from "react";
import { TaskCreateType, TaskStatus, TaskType } from "../types";

type TaskContextType = {
  tasks: TaskType[];
  getTasksByStatus: (status: TaskStatus) => TaskType[];
  moveTask: (task: TaskType, status: TaskStatus) => void;
  createTask: (task: TaskCreateType) => void;
  showModal: boolean;
  setShowModal: (show: boolean) => void;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<TaskType[]>([
    {
      id: 1,
      name: "Task One",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Todo,
    },
    {
      id: 2,
      name: "Task Two",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Completed,
    },
    {
      id: 3,
      name: "Task Three",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.Todo,
    },
    {
      id: 4,
      name: "Task Four",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsum, unde?",
      status: TaskStatus.InProgress,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  function getTasksByStatus(status: TaskStatus) {
    return tasks.filter((task) => task.status === status);
  }

  function moveTask(task: TaskType, status: TaskStatus) {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, status } : t
    );
    setTasks(newTasks);
  }

  function createTask(task: TaskCreateType) {
    setTasks((prevTasks) => [
      {
        id: prevTasks.length + 1,
        ...task,
        status: TaskStatus.Todo,
      },
      ...prevTasks,
    ]);
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasksByStatus,
        moveTask,
        createTask,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
