import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ItemList.module.css';
import axios from 'axios';
import { Item } from '../types/myType';

const ItemList: React.FC = () => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const [itemError, setItemError] = useState<string | null>(null);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        axios
            .get('/items')
            .then((response) => {
                setItemList(response.data); // Axios 는 응답 데이터를 response.data 에 저장
            })
            .catch((error) => {
                // 200~299 범위일 떄만 then 이 실행되고 그 외엔 catch
                setItemError(error.message);
                console.error('Error fetching items:', error);

                // 스프링부트가 켜지지 않았을 때 삽입할 임시 데이터 설정
                const tempItems: Item[] = [
                    {
                        id: 1,
                        title: 'Temp Item 1',
                        content: 'Description 1',
                        img: 'shoes1',
                        price: 1000,
                    },
                    {
                        id: 2,
                        title: 'Temp Item 2',
                        content: 'Description 2',
                        img: 'shoes2',
                        price: 1000,
                    },
                    {
                        id: 3,
                        title: 'Temp Item 3',
                        content: 'Description 3',
                        img: 'shoes3',
                        price: 1000,
                    },
                ];
                setItemList(tempItems);
            });
        return () => {
            console.log('axios 클리어 함수 실행');
            cancelTokenSource.cancel();
        };
    }, []);

    if (itemError && itemList.length === 0) {
        return (
            <div>
                {'Error : '}
                {itemError}
            </div>
        );
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                {Object.values(itemList).map((item) => (
                    <div className={'col-md-4'} key={item.id}>
                        <Link to={`/detail/${item.id}`}>
                            <img src={`https://codingapple1.github.io/shop/${item.img}.jpg`} width={'80%'} alt={''} />
                            <h4 className={'itemTitle'}>{item.title}</h4>
                            <p>{item.content}</p>
                            <p>{item.price}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItemList;
