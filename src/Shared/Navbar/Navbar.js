import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { HiBars3 } from "react-icons/hi2";
import { HiOutlineSearch } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { RiNotification3Line } from "react-icons/ri";
import { RiNotification3Fill } from "react-icons/ri";
import logo from "../../Assests/to-do-list.png";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";
import moment from "moment";
import { toast } from "react-hot-toast";
import Notification from "./Notification/Notification";

const Navbar = ({ handleDrawer }) => {
  const { googleSignIn, logOut, user } = useContext(AuthContext);
  const googleAuthProvider = new GoogleAuthProvider();
  const [dueTasks, setDueTasks] = useState([]);
  let currentdate = moment().format().slice(0, 16);
  const [notificationBox, setNotificationBox] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setDueTasks(data.data.filter((task) => task.date <= currentdate  && !task.finish));
      });
  }, [currentdate, user?.email, dueTasks]);

  const handleGoogleSignIn = () => {
    googleSignIn(googleAuthProvider)
      .then((result) => {
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };


  return (
    <div className="nav-bar w-full h-16 flex justify-between items-center px-8">
      <div className="flex items-center gap-5">
        <span
          onClick={handleDrawer}
          className="icon-hover cursor-pointer p-3 rounded-full"
        >
          <HiBars3 className="text-2xl rounded-full" />
        </span>
        <div className="flex items-center gap-3 select-none">
          <img alt="" src={logo} />
          <h1 className="text-2xl logo-title">Task Keeper</h1>
        </div>
      </div>
      <div className="flex items-center search-bar rounded-md">
        <span className="pl-3">
          <HiOutlineSearch className="search-icon" />
        </span>
        <input
          type="text"
          placeholder="Search"
          className="search-input w-96 py-2 px-5 outline-none rounded-md"
        />
      </div>
      <div className="flex relative items-center gap-3">
        {user?.email ? (
          <>
            <div
              onClick={() => setNotificationBox(!notificationBox)}
              className={`icon-hover cursor-pointer p-3 rounded-full ${
                dueTasks.length && "indicator"
              }`}
            >
            {
              notificationBox? 
              <RiNotification3Fill className="text-xl" />
              :
              <RiNotification3Line className="text-xl" />
            }

            </div>
            {notificationBox && (
              <div className="notification-box shadow-md w-80 p-5 bg-slate-100 h-96 select-none">
                <h2 className="text-lg font-semibold ">Notifications</h2>
                {dueTasks?.length === 0 ? (
                  <p className="mt-3">No Due Tasks.</p>
                ) : (
                  dueTasks?.map((task) => (
                    <Notification key={task._id} task={task}></Notification>
                  ))
                )}
              </div>
            )}

            <button
              className="cursor-pointer px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-all select-none"
              onClick={handleLogOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center gap-3 cursor-pointer px-5 py-2 rounded-full bg-slate-200 hover:bg-slate-300 transition-all"
          >
            <FcGoogle className="text-xl" /> Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
