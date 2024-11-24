import { FormEvent, useState } from "react";
import { useTaskContext } from "../hooks";

const TaskCreateModal = () => {
  const { createTask, setShowModal } = useTaskContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createTask({ name, description });

    setShowModal(false);
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start pt-10 justify-center">
      <form onSubmit={submit} className="bg-white p-5 lg:w-1/3 rounded-lg">
        <h2 className="text-2xl mb-5">Create Task</h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Name"
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full p-2 border border-gray-300 rounded-lg mb-3"
        ></textarea>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 text-white px-4 py-2 rounded-lg"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskCreateModal;
