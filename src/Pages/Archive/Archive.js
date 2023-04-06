import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import TaskModal from "../Tasks/TaskModal/TaskModal";
import TaskBox from "../Tasks/TaskBox/TaskBox";
import { AiOutlinePlus } from "react-icons/ai";
import { BiArchiveIn } from "react-icons/bi";

const Archive = () => {
  const [tasks, setTasks] = useState();
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data.data))
      .catch((err) => console.log(err.message));
  }, [user?.email, tasks]);

  const closeModal = () => setAddTaskModal(false);

  return (
    <>
      {!tasks?.filter((task) => task?.archive && !task?.trash).length ? (
        <div className="no-task w-full grid place-items-center">
          <div className="">
            <BiArchiveIn className="text-9xl mx-auto text-gray-300" />
            <p className="text-2xl text-gray-500">Tasks you add appear here</p>
          </div>
        </div>
      ) : (
        <div className="tasks-wrapper w-full p-5">
          <div className="grid grid-cols-4 gap-5">
            {tasks
              ?.filter((task) => task?.archive && !task?.trash)
              .map((filteredTask) => (
                <TaskBox key={filteredTask._id} task={filteredTask}></TaskBox>
              ))}
          </div>
        </div>
      )}
      <div
        onClick={() => setAddTaskModal(true)}
        className="fixed bottom-10 right-10 p-3 rounded-full add-btn transition-all cursor-pointer"
      >
        <AiOutlinePlus className="text-2xl" />
      </div>
      {addTaskModal && (
        <TaskModal className="relative" closeModal={closeModal}></TaskModal>
      )}
    </>
  );
};

export default Archive;
