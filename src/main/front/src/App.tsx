import './assets/styles/App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ItemList from './routes/ItemList';
import ItemDetail from './routes/ItemDetail';
import Attendance from './routes/Attendance';
import Cart from './routes/Cart';
import MainLayout from './layouts/MainLayout';
import LoginPage from './routes/LoginPage';
import ProtectedLayout from './layouts/ProtectedLayout';
import NavMenu from './layouts/NavMenu';

// const Cart = lazy(() => import('./routes/Cart'));
// const Attendance = lazy(() => import('./routes/Attendance'));

const App: React.FC = () => {
    return (
        <div className={'App'}>
            <header>
                <NavMenu />
            </header>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path={'/'} element={<ItemList />} />
                    <Route path={'/detail/:itemId'} element={<ItemDetail />} />
                    <Route path={'/login'} element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedLayout />}>
                    <Route path={'/attendance'} element={<Attendance />} />
                    <Route path={'/cart'} element={<Cart />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
