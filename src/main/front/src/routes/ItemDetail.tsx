import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ItemDetailTab from '../components/ItemDetailTab';
import OrderAlert from '../components/OrderAlert';
import { Item } from '../types/myType';
import { useRecoilState } from 'recoil';
import { tempItemList } from '../atoms/cartState';

const ItemDetail: React.FC = () => {
    console.log('ItemDetail 컴포넌트 렌더링');

    const { itemId } = useParams<string>();
    const [item, setItem] = useState<Item | null>(null);
    const [error, setError] = useState<string | null>(null);

    // 스프링부트 미실행 시 recoil 에 있는 전역상태 호출
    const [tempItem] = useRecoilState<Item[]>(tempItemList);

    useEffect(() => {
        const cancelTokenSource = axios.CancelToken.source();

        axios
            .get(`/details/${itemId}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch((responseError) => {
                if (typeof itemId === 'string') {
                    const itemIndex: number = parseInt(itemId, 10) - 1;
                    itemIndex < 0 || itemIndex > 2
                        ? setItem(tempItem[0])
                        : setItem(tempItem[itemIndex]);
                }
                setError(responseError.message);
            });
        return (): void => {
            console.log('axios 클리어 함수 실행');
            cancelTokenSource.cancel();
        };
    }, [itemId]);

    const addCart = (): Promise<void> => {
        return axios
            .post(`/api/${itemId}/addCart`)
            .then((response) => {
                alert(response.data);
            })
            .catch((responseError) => {
                alert(responseError.message);
                if (!item) return;

            });
    };

    if (error && item === null) {
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
                    <img
                        src={`https://codingapple1.github.io/shop/${item.img}.jpg`}
                        width={'100%'}
                        alt={''}
                    />
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
