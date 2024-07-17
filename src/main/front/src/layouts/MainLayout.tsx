import React from 'react';
import mainBgImg from '../assets/imgs/bg.png';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <div>
            <div className={'main-bg'} style={{ backgroundImage: `URL(${mainBgImg})` }} />
            <Outlet />
        </div>
    );
};

export default MainLayout;
