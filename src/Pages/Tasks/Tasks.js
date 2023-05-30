import React, { useContext, useEffect, useState } from "react";
import "./Tasks.css";
import { AiOutlinePlus } from "react-icons/ai";
import TaskModal from "./TaskModal/TaskModal";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import TaskBox from "./TaskBox/TaskBox";
import { BsListTask } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { InfinitySpin } from "react-loader-spinner";

const Tasks = () => {
  const { user } = useContext(AuthContext);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [tasks, setTasks] = useState();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if(!tasks && user){
      setLoading(true)
    }
    else{
      setLoading(false)
    }
    fetch(`https://task-keeper-five.vercel.app/tasks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data.filter((task) => !task?.archive && !task?.trash && !task.finish))
      })
      .catch((err) => console.log(err.message));
  }, [user?.email, user, tasks]);


  const closeModal = () => setAddTaskModal(false);
  const handleAddTask = () =>{
    if(user?.email){
      setAddTaskModal(true)
    }
    else{
      toast.success("Please login to your account!")
    }
  }

  if (loading) {
    return (
      <div className="w-full h-screen grid place-items-center">
        <InfinitySpin width="200" color="#FAD207" />
      </div>
    );
  }
  return (
    <>
      {!tasks?.length ? (
        <div className="no-task w-full grid place-items-center">
          <div className="">
            <BsListTask className="text-9xl mx-auto text-gray-300" />
            <p className="text-2xl text-gray-500">Tasks you add appear here</p>
          </div>
        </div>
      ) : (
        <div className="tasks-wrapper md:m-0 ml-20 w-full p-5">
          <div className="grid md:grid-cols-4 grid-cols-1 gap-5">
            {tasks
              ?.filter((task) => !task?.archive && !task?.trash && !task.finish)
              .map((filteredTask) => (
                <TaskBox key={filteredTask._id} task={filteredTask}></TaskBox>
              ))}
          </div>
        </div>
      )}
      <div
        onClick={handleAddTask}
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

export default Tasks;
