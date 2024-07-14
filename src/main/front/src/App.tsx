import './assets/styles/App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemList from './routes/ItemList';
import ItemDetail from './routes/ItemDetail';
import Attendance from './routes/Attendance';
import Cart from './routes/Cart';
import { RecoilRoot } from 'recoil';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <div className={'App'}>
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route path={'/'} element={<ItemList />} />
                            <Route path={'/detail/:itemId'} element={<ItemDetail />} />
                            <Route path={'/attendance'} element={<Attendance />} />
                            <Route path={'/cart'} element={<Cart />} />
                        </Route>
                    </Routes>
                </div>
            </BrowserRouter>
        </RecoilRoot>
    );
};

export default App;
