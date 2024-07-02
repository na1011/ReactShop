import './App.css';
import NavMenu from "./components/NavMenu";
import mainBgImg from "./imgs/bg.png";
import React, {useEffect, useState} from "react";
import ItemList from "./components/ItemList";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import ItemDetail from "./components/ItemDetail";

function App() {

    const [itemList, setItemList] = useState([]);
    const [itemError, setItemError] = useState(null);

    useEffect(() => {
        axios.get('/items')
            .then(response => {
                setItemList(response.data); // Axios 는 응답 데이터를 response.data 에 저장
            })
            .catch(error => {               // 200~299 범위일 떄만 then 이 실행되고 그 외엔 catch
                setItemError(error.message);
                console.error('Error fetching items:', error);

                // 스프링부트가 켜지지 않았을 때 삽입할 임시 데이터 설정
                const tempItems = [
                    {id: 1, title: 'Temp Item 1', content: 'Description 1', img: 'shoes1', price: '1000'},
                    {id: 2, title: 'Temp Item 2', content: 'Description 2', img: 'shoes2', price: '1000'},
                    {id: 3, title: 'Temp Item 3', content: 'Description 3', img: 'shoes3', price: '1000'}
                ];
                setItemList(tempItems);
            });
    }, []);

    return (
        <div className={"App"}>
            <NavMenu/>
            <div className="main-bg" style={{backgroundImage: 'URL(' + mainBgImg + ')'}}/>
            <Routes>
                <Route path={"/"} element={<ItemList itemList={itemList} error={itemError}/>}/>
                <Route path={"/detail/:itemId"} element={<ItemDetail/>}/>
            </Routes>
        </div>
    );
}

export default App;
