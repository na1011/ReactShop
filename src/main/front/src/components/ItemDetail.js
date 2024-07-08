import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import OrderAlert from "./OrderAlert";
import ItemDetailTab from "./ItemDetailTab";

function ItemDetail() {

    console.log('ItemDetail 컴포넌트 렌더링');

    const {itemId} = useParams();
    const [item, setItem] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        axios.get(`/details/${itemId}`)
            .then(response => {
                setItem(response.data);
            })
            .catch(error => {
                // 스프링부트가 켜지지 않았을 때 삽입할 임시 데이터 설정
                const tempItem = {
                    id: 1, title: 'Temp Item 1', content: 'Description 1', img: 'shoes1', price: '1000'
                };
                setItem(tempItem);
                setError(error.message);
            });
        return () => {
            console.log('axios 클리어 함수 실행');
            cancelTokenSource.cancel();
        }
    }, [itemId]);

    if (error && item == null) {
        return (<div>Error : {error}</div>);
    }

    if (!item) {
        return (<div>Loading...</div>);
    }

    return (
        <div className="container">
            <OrderAlert/>
            <form className="row">
                <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/${item.img}.jpg`} width="100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}</p>
                    <p>수량 : <input type={"text"}
                                   className={"form-control"}
                                   name={"quantity"}/></p>
                    <button className="btn btn-danger" type={"submit"}>주문하기</button>
                </div>
            </form>
            <ItemDetailTab />
        </div>
    );
}

export default ItemDetail;