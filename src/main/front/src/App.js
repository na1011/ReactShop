import './assets/styles/App.css';
import NavMenu from "./components/NavMenu";
import mainBgImg from "./assets/imgs/bg.png";
import React, {useEffect, useState} from "react";
import ItemList from "./components/ItemList";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import ItemDetail from "./components/ItemDetail";
import Attendance from "./components/Attendance";

function App() {
    return (
        <div className={"App"}>
            <NavMenu/>
            <div className="main-bg" style={{backgroundImage: 'URL(' + mainBgImg + ')'}}/>
            <Routes>
                <Route path={"/"} element={<ItemList />}/>
                <Route path={"/detail/:itemId"} element={<ItemDetail/>}/>
                <Route path={"/attendance"} element={<Attendance/>} />
            </Routes>
        </div>
    );
}

export default App;
