import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ItemDetailTab from '../components/ItemDetailTab';
import OrderAlert from '../components/OrderAlert';
import { Item } from '../types/myType';

const ItemDetail: React.FC = () => {
    console.log('ItemDetail 컴포넌트 렌더링');

    const { itemId } = useParams();
    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        axios
            .get(`/details/${itemId}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((responseError) => {
                // 스프링부트가 켜지지 않았을 때 삽입할 임시 데이터 설정
                const tempItem: Item = {
                    id: 1,
                    title: 'Temp Item 1',
                    content: 'Description 1',
                    img: 'shoes1',
                    price: 1000,
                };
                setItem(tempItem);
                setError(responseError.message);
            });
        return () => {
            console.log('axios 클리어 함수 실행');
            cancelTokenSource.cancel();
        };
    }, [itemId]);

    const addCart = (): Promise<void> => {
        return axios
            .post(`/api/${itemId}/addCart`)
            .then((response) => {
                alert('장바구니에 정상적으로 추가되었습니다.');
            })
            .catch((responseError) => {
                alert(responseError.message);
            });
    };

    if (error && item == null) {
        return (
            <div>
                {'Error : '}
                {error}
            </div>
        );
    }

    if (!item) {
        return <div>{'Loading...'}</div>;
    }

    return (
        <div className={'container'}>
            <OrderAlert />
            <form className={'row'}>
                <div className={'col-md-6'}>
                    <img src={`https://codingapple1.github.io/shop/${item.img}.jpg`} width={'100%'} alt={''} />
                </div>
                <div className={'col-md-6'}>
                    <h4 className={'pt-5'}>{item.title}</h4>
                    <p>{item.content}</p>
                    <p>{item.price}</p>
                    <p>
                        {'수량 : '}
                        <input type={'text'} className={'form-control'} name={'quantity'} />
                    </p>
                    <button className={'btn btn-danger'} onClick={addCart} type={'button'}>
                        {'장바구니 넣기'}
                    </button>
                </div>
            </form>
            <ItemDetailTab />
        </div>
    );
};

export default ItemDetail;
