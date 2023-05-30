import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import TaskModal from "../Tasks/TaskModal/TaskModal";
import TaskBox from "../Tasks/TaskBox/TaskBox";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { InfinitySpin } from "react-loader-spinner";

const Trash = () => {
  const [tasks, setTasks] = useState();
  const [addTaskModal, setAddTaskModal] = useState(false);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(!tasks){
      setLoading(true)
    }
    else{
      setLoading(false)
    }
    fetch(`https://task-keeper-five.vercel.app/tasks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setTasks(data.data.filter((task) => task.trash)))
      .catch((err) => console.log(err.message));
  }, [user?.email, tasks]);

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <InfinitySpin width="200" color="#FAD207" />
      </div>
    );
  }

  const closeModal = () => setAddTaskModal(false);
  return (
    <>
      {!tasks?.length ? (
        <div className="no-task w-full grid place-items-center">
          <div className="">
            <BsTrash className="text-9xl mx-auto text-gray-300" />
            <p className="text-2xl text-gray-500">Tasks you add appear here</p>
          </div>
        </div>
      ) : (
        <div className="tasks-wrapper md:m-0 ml-20 w-full p-5">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
            {tasks
              ?.map((filteredTask) => (
                <TaskBox key={filteredTask._id} task={filteredTask}></TaskBox>
              ))}
          </div>
          <div
            onClick={() => setAddTaskModal(true)}
            className="fixed bottom-10 right-10 p-3 rounded-full add-btn transition-all cursor-pointer"
          >
            <AiOutlinePlus className="text-2xl" />
          </div>
          {addTaskModal && (
            <TaskModal className="relative" closeModal={closeModal}></TaskModal>
          )}
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

export default Trash;
