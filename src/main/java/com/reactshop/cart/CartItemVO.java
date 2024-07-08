package com.reactshop.cart;

import com.reactshop.item.ItemVO;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CartItemVO {
    private ItemVO item;
    private int quantity;

    public void incQuantity() {
        this.quantity ++;
    }

    public void decQuantity() {
        this.quantity --;
    }
}
