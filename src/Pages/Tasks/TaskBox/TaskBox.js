import React, { useState } from "react";
import "./TaskBox.css";
import { BsTrash, BsEye } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { MdRestoreFromTrash, MdDeleteForever } from "react-icons/md";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import TaskDetails from "../TaskDetails/TaskDetails";
import EditTask from "../EditTask/EditTask";
import { toast } from "react-hot-toast";

const TaskBox = ({ task }) => {
  const [viewTask, setViewTask] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const closeTask = () => setViewTask(false);
  const closeEditModal = () => setEditTask(false);

  const handleArchive = () => {
    fetch(`http://localhost:5000/archive/${task?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success(`${task.title} task has been archived!`)
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleUnArchive = () => {
    fetch(`http://localhost:5000/unarchive/${task?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success(`${task.title} task has been unarchived!`)
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleTrash = () => {
    fetch(`http://localhost:5000/trash/${task?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success(`${task.title} task moved to the trash!`)
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleRestore = () => {
    fetch(`http://localhost:5000/restore/${task?._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data.modifiedCount > 0) {
          toast.success(`${task.title} task has been restored!`)
        }
      })
      .catch((err) => console.log(err.message));
  };

  const handleDelete = (id) => {
    const proceed = window.confirm("Are you want to delete this task permantly?");
    if (proceed) {
      fetch(`http://localhost:5000/task/${task?._id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          if (data.data.deletedCount > 0) {
          toast.success(`${task.title} task has been permanantly deleted!`)
          }
        });
    }
  };

  return (
    <div className="task-box select-none relative border p-3 h-[190px] rounded-lg hover:shadow-md">
      <div onClick={() => setViewTask(!viewTask)} className="cursor-pointer">
        <h1 className="font-semibold text-md">{task.title}</h1>
        <p className="text-sm text-gray-500 mb-2">Due Date: {task.date.replace("T", ", ")}</p>
        <p className="line-clamp-3">{task.details}</p>
      </div>
      <div className="absolute bottom-3 w-full right-3 flex gap-2 justify-end">

        {task.trash ? (
          <>
            <span
              onClick={handleRestore}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <MdRestoreFromTrash className="text-xl"/>
            </span>
            <span
              onClick={handleDelete}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <MdDeleteForever className="text-xl"/>
            </span>
          </>
        ) : (
          <>
            <span
              onClick={() => setViewTask(true)}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <BsEye />
            </span>
            <span
              onClick={() => setEditTask(true)}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <FiEdit />
            </span>
            
            {task.archive ? (
              <span
                onClick={handleUnArchive}
                className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <BiArchiveOut />
              </span>
            ) : (
              <span
                onClick={handleArchive}
                className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
              >
                <BiArchiveIn />
              </span>
            )}
            <span
              onClick={handleTrash}
              className="p-2 rounded-full hover:bg-slate-200 cursor-pointer"
            >
              <BsTrash />
            </span>
          </>
        )}
      </div>
      {viewTask && (
        <TaskDetails task={task} closeTask={closeTask}></TaskDetails>
      )}
      {editTask && (
        <EditTask closeModal={closeEditModal} task={task}></EditTask>
      )}
    </div>
  );
};

export default TaskBox;
