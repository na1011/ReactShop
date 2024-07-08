import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import cartNav from '../assets/cartList.json';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Cart(props) {
  console.log('Cart 컴포넌트 호출');

  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    axios
      .get('/getCartList')
      .then((response) => {
        setCartList(response.data);
      })
      .catch((error) => {
        console.log('error 호출');
        // alert(error.message);
        const tempList = [
          {
            quantity: 1,
            item: {
              id: 1,
              title: 'Temp Item 1',
              content: 'Description 1',
              img: 'shoes1',
              price: '1000',
            },
          },
          {
            quantity: 3,
            item: {
              id: 2,
              title: 'Temp Item 2',
              content: 'Description 2',
              img: 'shoes2',
              price: '2000',
            },
          },
        ];
        setCartList(tempList);
      });
  }, []);

  if (!cartList) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
            <tr>
              <td key={cart.item.id}>{index}</td>
              <td>
                <Link to={`/detail/${cart.item.id}`}>{cart.item.title}</Link>
              </td>
              <td>{cart.quantity}</td>
              <td>안녕</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
