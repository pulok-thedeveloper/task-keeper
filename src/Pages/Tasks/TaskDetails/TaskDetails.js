import React from "react";
import { RxCross2 } from 'react-icons/rx';

const TaskDetails = ({ closeTask, task }) => {
  return (
    <div>
      <div
        onClick={closeTask}
        className="modal-wrapper fixed left-0 top-0 right-0 bottom-0"
      ></div>
      <div className="modal-container z-10 w-2/3 h-2/3 overflow-y-scroll bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg">
        <h1 className="text-xl font-semibold mb-3">{task.title}</h1>
        <p>{task.details}</p>
        <span onClick={closeTask} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 cursor-pointer"><RxCross2/></span>
      </div>
    </div>
  );
};

export default TaskDetails;
