import React, { useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import NotesContainer from '../NotesContainer/NotesContainer';

const Main = () => {
    const [isOpenDrawer, setDrawer] = useState(false);
    const handleDrawer = () =>{
        setDrawer(!isOpenDrawer);
    }
    return (
        <div>
            <Navbar handleDrawer={handleDrawer}></Navbar>
            <NotesContainer isOpenDrawer={isOpenDrawer} setDrawer={setDrawer}></NotesContainer>
        </div>
    );
};

export default Main;