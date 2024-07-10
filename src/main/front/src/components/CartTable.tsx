import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cartNav from '../assets/cartList.json';
import { CartItem, CartList } from '../types/myType';
import { useRecoilState } from 'recoil';
import { cartState } from '../atoms/cartState';

const CartTable: React.FC = () => {
    const [user, setUser] = useState<number | null>(null);
    const [cartList, setCartList] = useState<CartItem[]>([]);

    const [tempCart] = useRecoilState<CartList>(cartState);

    useEffect(() => {
        axios
            .get('/getCartList')
            .then((response) => {
                setUser(response.data.id);
                setCartList(response.data.cartList);
            })
            .catch((error) => {
                console.log('error 호출 ', error.message);
                setUser(tempCart.user);
                setCartList(tempCart.cartList);
            });
    }, []);

    if (!cartList) {
        return <div>{'Loading...'}</div>;
    }

    return (
        <div>
            <h3>
                {user}
                {' 님의 장바구니'}
            </h3>
            <Table>
                <thead>
                    <tr>
                        {cartNav.head.map((menu) => (
                            <th key={menu.id}>{menu.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {cartList.map((cart, index) => (
                        <tr key={cart.item.id}>
                            <td>{index}</td>
                            <td>
                                <Link to={`/detail/${cart.item.id}`}>{cart.item.title}</Link>
                            </td>
                            <td>{cart.quantity}</td>
                            <td>{'안녕'}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CartTable;
