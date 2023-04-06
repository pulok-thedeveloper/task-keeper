import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Archive from "../Pages/Archive/Archive";
import Trash from "../Pages/Trash/Trash";
import Tasks from "../Pages/Tasks/Tasks";
import PrivateRoute from "./PrivateRoute";
import Completed from "../Pages/Completed/Completed";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Tasks></Tasks>
            },
            {
                path: '/remainders',
                element: <PrivateRoute><Completed></Completed></PrivateRoute>
            },
            {
                path: '/archive',
                element: <PrivateRoute><Archive></Archive></PrivateRoute>
            },
            {
                path: '/trash',
                element: <PrivateRoute><Trash></Trash></PrivateRoute>
            },

        ]
    }
])