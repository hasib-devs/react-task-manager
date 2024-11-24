import TaskCard from "../components/TaskCard";
import { useTaskContext } from "../hooks";
import { TaskStatus } from "../types";
import TaskCreateModal from "./TaskCreateModal";

const TaskBoard = () => {
  const { setShowModal, showModal } = useTaskContext();

  return (
    <div className="mx-auto px-5 py-10 bg-white">
      <div className="flex justify-center items-cente gap-5 mb-5">
        <h1 className="text-4xl text-center mb-3">Task Manager</h1>
        <button
          onClick={() => setShowModal(true)}
          className="text-2xl w-10 h-10 rounded-full bg-teal-500 text-white"
        >
          +
        </button>
      </div>

      <div className="grid grid-cols-3 bg-gray-200 border border-gray-200">
        {/* Card Todo */}
        {Object.values(TaskStatus).map((status) => {
          return <TaskCard key={status} status={status} />;
        })}
      </div>

      {/* Create Modal */}
      {showModal && <TaskCreateModal />}
    </div>
  );
};

export default TaskBoard;
