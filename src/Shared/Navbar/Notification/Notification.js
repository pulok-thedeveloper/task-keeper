import React, { useState } from "react";
import EditTask from "../../../Pages/Tasks/EditTask/EditTask";
import { toast } from "react-hot-toast";

const Notification = ({ task }) => {
  const [editTask, setEditTask] = useState(false);

  const closeEditModal = () => setEditTask(false);

  const handleFinish = () => {
    fetch(`http://localhost:5000/finish/${task?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success(`${task.title} task has been finished!`);
        }
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="border-b py-3">
      {" "}
      <p className="mb-2">
        Have you completed the{" "}
        <span className="font-semibold">{task.title}</span> task?
      </p>
      <div className="flex gap-3">
        <button
          className="py-1 px-3 rounded bg-blue-200 hover:bg-blue-300"
          onClick={() => setEditTask(true)}
        >
          Edit
        </button>
        <button
          className="py-1 px-3 rounded bg-green-200 hover:bg-green-300"
          onClick={handleFinish}
        >
          Finish
        </button>
      </div>
      {editTask && (
        <EditTask closeModal={closeEditModal} task={task}></EditTask>
      )}
    </div>
  );
};

export default Notification;
