import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetailTab from '../components/ItemDetailTab';
import OrderAlert from '../components/OrderAlert';
import { CartList, Item } from '../types/myType';
import { useRecoilState } from 'recoil';
import { cartState, tempItemList } from '../atoms/cartState';
import useFetchData from '../hooks/useFetchData';
import usePostRequest from '../hooks/usePostRequest';
import { updateCartState } from '../utils/updateCartState';

const ItemDetail: React.FC = () => {
    console.log('ItemDetail 컴포넌트 렌더링');

    const { itemId } = useParams<string>();
    const [item, setItem] = useState<Item | null>(null);

    // 스프링부트 미실행 시 recoil 에 있는 전역상태 호출
    const [tempItem] = useRecoilState<Item[]>(tempItemList);
    const [tempCart, setTempCart] = useRecoilState<CartList>(cartState);

    const { fetchData, fetchError } = useFetchData<Item | null>(`/details/${itemId}`, null);
    const { postData, postError, postIsLoading, resetState, postApi } =
        usePostRequest<string>(null);

    useEffect(() => {
        if (fetchData) {
            setItem(fetchData);
        } else if (typeof itemId === 'string' && !fetchData) {
            const itemIndex: number = parseInt(itemId, 10) - 1;
            itemIndex < 0 || itemIndex > 2 ? setItem(tempItem[0]) : setItem(tempItem[itemIndex]);
        }
    }, [itemId, fetchData]);

    useEffect(() => {
        if (item) {
            const watched = new Set(JSON.parse(localStorage.getItem('watched') ?? '[]'));
            watched.add(item.id);
            localStorage.setItem('watched', JSON.stringify(Array.from(watched)));
        }
    }, [item]);

    useEffect(() => {
        if (postData) {
            alert(postData);
        } else if (postError) {
            alert(postError);
            updateCartState(item, tempCart, setTempCart);
        }
    }, [postData, postError]);

    const addCart = async (): Promise<void> => {
        resetState();
        await postApi(`/api/${itemId}/addCart`);
    };

    if (fetchError && item === null) {
        return (
            <div>
                {'Error : '}
                {fetchError}
            </div>
        );
    }

    if (!item || postIsLoading) {
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
