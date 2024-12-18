import { useDrop } from "react-dnd";
import { TaskStatus, TaskType } from "../types";
import Taskitem from "./Taskitem";
import { useTaskContext } from "../hooks";

type Props = {
  status: TaskStatus;
};

const TaskCard = ({ status }: Props) => {
  const { moveTask, getTasksByStatus } = useTaskContext();
  const tasks = getTasksByStatus(status);

  function handleMove(item: { task: TaskType; type: TaskStatus }) {
    moveTask(item.task, status as TaskStatus);
  }

  const [{ isOver }, dropRef] = useDrop(() => {
    return {
      accept: Object.values(TaskStatus),
      drop(item: { task: TaskType; type: TaskStatus }, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }
        handleMove(item);
      },
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
    };
  }, []);

  const onDropOverStyle = () => {
    return {
      border: isOver ? "1px dashed black" : undefined,
      opacity: isOver ? 0.8 : 1,
    };
  };

  return (
    <>
      <div className="flex flex-col">
        <h3 className="p-4 border-b text-xl bg-white capitalize flex items-center gap-3">
          <span>{status.replace("-", " ")}</span>
          <span className="bg-gray-200 text-gray-600 text-sm rounded-full px-2 ml-2">
            {tasks.length}
          </span>
        </h3>

        <div
          ref={dropRef}
          className="m-2 p-2 flex flex-col gap-3 flex-1 rounded-lg border border-transparen"
          style={{
            ...onDropOverStyle(),
          }}
        >
          {tasks.length === 0 && (
            <div className="text-sm text-gray-500">No tasks here</div>
          )}

          {tasks.map((task) => (
            <Taskitem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
