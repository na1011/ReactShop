import React from 'react';
import NavMenu from './NavMenu';
import mainBgImg from '../assets/imgs/bg.png';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginSelector } from '../atoms/LoginAtom';

const ProtectedLayout: React.FC = () => {
    const isLogin: boolean = useRecoilValue(isLoginSelector);
    const currentLocation = useLocation();

    return (
        <div>
            <div className={'main-bg'} style={{ backgroundImage: `URL(${mainBgImg})` }} />
            {isLogin ? (
                <Outlet />
            ) : (
                <Navigate
                    to={'/login'}
                    replace={true}
                    state={{ redirectedFrom: currentLocation }}
                />
            )}
        </div>
    );
};

export default ProtectedLayout;
