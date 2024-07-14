import React, { useEffect } from 'react';
import NavMenu from './NavMenu';
import mainBgImg from '../assets/imgs/bg.png';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
    return (
        <>
            <header>
                <NavMenu />
                <div className={'main-bg'} style={{ backgroundImage: `URL(${mainBgImg})` }} />
            </header>
            <Outlet />
        </>
    );
};

export default MainLayout;
