import React, { useContext } from "react";
import "./TaskModal.css";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const TaskModal = ({ closeModal }) => {
  const { user } = useContext(AuthContext);

  const handleSaveTask = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = user?.email;
    const title = form.title.value;
    const details = form.details.value;
    const date = form.date.value;

    const task = {
        email,
        title,
        details,
        date
    }

    fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        form.reset();
        closeModal();
        toast.success(`${task.title} task created successfully!`)
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <div
        onClick={closeModal}
        className="modal-wrapper fixed left-0 top-0 right-0 bottom-0"
      ></div>
      <form
        onSubmit={handleSaveTask}
        className="modal-container bg-white flex flex-col gap-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg"
      >
        <input
          type="text"
          placeholder="Add Title"
          name="title"
          required
          className="outline-none w-96 rounded-lg bg-slate-200 px-5 py-2"
        />
        <textarea
          placeholder="Type Details"
          name="details"
          rows="10"
          className="outline-none w-96 rounded-lg bg-slate-200 px-5 py-2"
        ></textarea>
        <input
          type="datetime-local"
          name="date"
          className="outline-none w-96 rounded-lg bg-slate-200 px-5 py-2"
        />
        <div className="flex gap-3 justify-end">
          <button
            onClick={closeModal}
            className="close-btn bg-red-500 text-white outline-none rounded-lg cursor-pointer px-5 py-2"
          >
            Close
          </button>
          <input
            className="save-task outline-none rounded-lg cursor-pointer px-5 py-2"
            type="submit"
            value="Save"
          />
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
