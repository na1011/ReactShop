package com.reactshop.cart;

import com.reactshop.item.ItemVO;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CartListVO {
    private long id;
    private List<CartItemVO> cartList;

    public void addItem(ItemVO item) {
        for (CartItemVO cartItem : cartList) {
            if (cartItem.getItem().getId() == item.getId()) {
                cartItem.incQuantity();
                return;
            }
        }
        cartList.add(CartItemVO.builder().item(item).quantity(1).build());
    }
}
