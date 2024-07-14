import { atom, selector } from 'recoil';
import { CartItem, CartList, Item } from '../types/myType';

// 스프링부트 미실행 시 recoil 을 통해 전역으로 삽입할 Item 리스트
const tempItems: Item[] = [
    {
        id: 1,
        title: 'Temp Item 1',
        content: 'Description 1',
        img: 'shoes1',
        price: 1000
    },
    {
        id: 2,
        title: 'Temp Item 2',
        content: 'Description 2',
        img: 'shoes2',
        price: 2000
    },
    {
        id: 3,
        title: 'Temp Item 3',
        content: 'Description 3',
        img: 'shoes3',
        price: 3000
    }
];

const tempCartItem: CartItem = {
    quantity: 2,
    item: tempItems[2]
};

// Atom : 상태를 나타내는 기본 단위
export const tempItemList = atom<Item[]>({
    key: 'tempItemList', // 고유키
    default: tempItems // 초기 상태
});

export const cartState = atom<CartList>({
    key: 'cartState',
    default: {
        user: 12345,
        cartList: [tempCartItem]
    }
});

// Selector : atom 을 기반으로 파생된 상태. (장바구니의 총 가격 계산)
export const cartTotalSelector = selector<number>({
    key: 'cartTotalSelector',
    get: ({ get }) => {
        const cart = get(cartState); // Atom 상태 읽기
        return cart.cartList.reduce(
            (acc, cartItem) => acc + cartItem.item.price * cartItem.quantity,
            0
        );
    }
});
