import React, { useContext } from "react";
import "./Drawer.css";
import { NavLink } from "react-router-dom";
import { BsCheckLg, BsTrash, BsListTask } from "react-icons/bs";
import { BiArchiveIn } from "react-icons/bi";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";

const Drawer = ({ isOpenDrawer, setDrawer }) => {
  const {user} = useContext(AuthContext)
  return (
    <div className={`drawer md:static absolute md:shadow-none md:bg-transparent z-10 pt-3 ${isOpenDrawer && "shadow-md bg-white"}`}>
      <ul>
        <li>
          <NavLink to="/">
            <span
              className={`px-8 py-[1px] rounded-r-full flex items-center gap-4 ${
                isOpenDrawer && "drawer-link active-color w-72"
              }`}
            >
              <span
                className={`p-3 rounded-full drawer-icon ${
                  isOpenDrawer === false && "drawer-icon-active"
                }`}
              >
                <BsListTask className="text-xl" />
              </span>
              {isOpenDrawer && <span>Tasks</span>}
            </span>
          </NavLink>
        </li>
        {user?.email && (
          <>
            <li>
              <NavLink to="/completed">
                <span
                  className={`px-8 py-[1px] rounded-r-full flex items-center gap-4 ${
                    isOpenDrawer && "drawer-link active-color w-72"
                  }`}
                >
                  <span
                    className={`p-3 rounded-full drawer-icon ${
                      isOpenDrawer === false && "drawer-icon-active"
                    }`}
                  >
                    <BsCheckLg className="text-xl" />
                  </span>{" "}
                  {isOpenDrawer && "Completed Tasks"}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/archive">
                <span
                  className={`px-8 py-[1px] rounded-r-full flex items-center gap-4 ${
                    isOpenDrawer && "drawer-link active-color w-72"
                  }`}
                >
                  <span
                    className={`p-3 rounded-full drawer-icon ${
                      isOpenDrawer === false && "drawer-icon-active"
                    }`}
                  >
                    <BiArchiveIn className="text-xl" />
                  </span>{" "}
                  {isOpenDrawer && "Archive"}
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/trash">
                <span
                  className={`px-8 py-[1px] rounded-r-full flex items-center gap-4 ${
                    isOpenDrawer && "drawer-link active-color w-72"
                  }`}
                >
                  <span
                    className={`p-3 rounded-full drawer-icon ${
                      isOpenDrawer === false && "drawer-icon-active"
                    }`}
                  >
                    <BsTrash className="text-xl" />
                  </span>{" "}
                  {isOpenDrawer && "Trash"}
                </span>
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Drawer;
