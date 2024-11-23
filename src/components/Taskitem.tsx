import type { TaskType } from "../types";
import { useDrag } from "react-dnd";

type Props = {
  task: TaskType;
};

const Taskitem = ({ task }: Props) => {
  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: task.status,
      item: { task },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    []
  );

  return (
    <div className="cursor-move" ref={dragRef} style={{ opacity }}>
      <div className="bg-white rounded-lg p-4">
        <h4 className="text-lg">{task.title}</h4>
        <p className="text-sm">{task.description}</p>
      </div>
    </div>
  );
};

export default Taskitem;
