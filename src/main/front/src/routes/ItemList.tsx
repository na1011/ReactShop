import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ItemList.module.css';
import { Item } from '../types/myType';
import { useRecoilState } from 'recoil';
import { tempItemList } from '../atoms/cartState';
import useFetchData from '../hooks/useFetchData';

const ItemList: React.FC = () => {
    const [itemList, setItemList] = useState<Item[]>([]);
    const { fetchData, fetchError } = useFetchData<Item[]>('/items', []);

    // Recoil 에서 전역 상태로 관리되는 tempItems 을 불러옴
    const [tempItems] = useRecoilState<Item[]>(tempItemList);

    useEffect(() => {
        if (fetchData !== null && fetchData.length !== 0) {
            setItemList(fetchData);
        } else {
            setItemList(tempItems);
        }
    }, [fetchData]);

    if (fetchError && itemList.length === 0) {
        return (
            <div>
                {'Error : '}
                {fetchError}
            </div>
        );
    }

    return (
        <div className={'container'}>
            <div className={'row'}>
                {Object.values(itemList).map((item) => (
                    <div className={'col-md-4'} key={item.id}>
                        <Link to={`/detail/${item.id}`}>
                            <img
                                src={`https://codingapple1.github.io/shop/${item.img}.jpg`}
                                width={'80%'}
                                alt={''}
                            />
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
