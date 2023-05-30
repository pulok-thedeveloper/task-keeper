import React, { useState } from "react";
import { toast } from "react-hot-toast";

const EditTask = ({closeModal, task}) => {

  const [newTask, setNewTask] =useState(task);


  const handleInputChange = event =>{
      const field = event.target.name;
      const value = event.target.value;
      const updatedTask = {...task}
      updatedTask[field] = value;
      setNewTask(updatedTask);
  }

    const handleSaveTask = (e) =>{
        e.preventDefault();
        console.log(newTask)

        fetch(`https://task-keeper-five.vercel.app/task/${task?._id}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newTask)
        })
        .then(res => res.json())
        .then(data =>{
            if(data.data.modifiedCount > 0){
                closeModal();
                toast.success(`${task.title} task updated successfully!`)
            }
        })
        .catch(err => console.log(err.message));
    }

  return (
    <div>
      <div
        onClick={closeModal}
        className="modal-wrapper z-20 fixed left-0 top-0 right-0 bottom-0"
      ></div>
      <form
        onSubmit={handleSaveTask}
        className="modal-container max-h-2/3 z-20 bg-white flex flex-col gap-3 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg"
      >
        <input
          type="text"
          placeholder="Add Title"
          name="title"
          defaultValue={task.title}
          onChange={handleInputChange}
          required
          className="outline-none w-96 rounded-lg bg-slate-200 px-5 py-2"
        />
        <textarea
          placeholder="Type Details"
          name="details"
          defaultValue={task.details}
          rows="10"
          onChange={handleInputChange}
          className="outline-none w-96 rounded-lg bg-slate-200 px-5 py-2 overflow-y-scroll"
        ></textarea>
        <input
          type="datetime-local"
          name="date"
          defaultValue={task.date}
          onChange={handleInputChange}
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

export default EditTask;
