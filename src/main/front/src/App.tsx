import './assets/styles/App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NavMenu from './components/NavMenu';
import mainBgImg from './assets/imgs/bg.png';
import ItemList from './routes/ItemList';
import ItemDetail from './routes/ItemDetail';
import Attendance from './routes/Attendance';
import Cart from './routes/Cart';

const App: React.FC = () => {
    return (
        <div className={'App'}>
            <NavMenu />
            <div className={'main-bg'} style={{ backgroundImage: `URL(${mainBgImg})` }} />
            <Routes>
                <Route path={'/'} element={<ItemList />} />
                <Route path={'/detail/:itemId'} element={<ItemDetail />} />
                <Route path={'/attendance'} element={<Attendance />} />
                <Route path={'/cart'} element={<Cart />} />
            </Routes>
        </div>
    );
};

export default App;
