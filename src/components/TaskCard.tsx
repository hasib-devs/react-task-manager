import { useDrop } from "react-dnd";
import { TaskStatus, TaskType } from "../types";
import Taskitem from "./Taskitem";

type Props = {
  status: string;
  data: TaskType[];
  moveTask: (task: TaskType, status: TaskStatus) => void;
};

const TaskCard = ({ status, data, moveTask }: Props) => {
  const [{ isOver }, dropRef] = useDrop(() => {
    return {
      accept: Object.values(TaskStatus),
      drop(item: { task: TaskType; type: TaskStatus }) {
        moveTask(item.task, status as TaskStatus);
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
        <h3 className="p-4 border-b text-xl bg-white capitalize">
          {status.replace("-", " ")}
        </h3>

        <div
          ref={dropRef}
          className="m-2 p-2 flex flex-col gap-3 flex-1 rounded-lg border border-transparen"
          style={{
            ...onDropOverStyle(),
          }}
        >
          {data.map((task) => (
            <Taskitem key={task.id} task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
