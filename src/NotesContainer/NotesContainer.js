import React from 'react';
import Drawer from '../Shared/Drawer/Drawer';
import { Outlet } from 'react-router-dom';
import './NotesContainer.css';

const NotesContainer = ({isOpenDrawer, setDrawer}) => {
    return (
        <div className='notes-container w-screen flex'>
            <Drawer isOpenDrawer={isOpenDrawer} setDrawer={setDrawer}></Drawer>
            <Outlet></Outlet>
        </div>
    );
};

export default NotesContainer;