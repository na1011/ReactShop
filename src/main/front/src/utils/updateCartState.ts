import { CartList, Item } from '../types/myType';

export const updateCartState = (
    item: Item | null,
    tempCart: CartList,
    setTempCart: (tempCart: CartList) => void
): void => {
    if (!item) return;
    if (tempCart.cartList.find((cartItem) => cartItem.item.id === item.id)) {
        console.log('이미 존재하는 아이템이지롱~', tempCart.cartList);
        setTempCart({
            ...tempCart,
            cartList: tempCart.cartList.map((cartItem) =>
                cartItem.item.id === item.id
                    ? {
                          ...cartItem,
                          quantity: cartItem.quantity + 1
                      }
                    : cartItem
            )
        });
    } else {
        console.log('새로운 아이템 추가요~', tempCart.cartList);
        setTempCart({
            ...tempCart,
            cartList: [...tempCart.cartList, { quantity: 1, item: item }]
        });
    }
};
