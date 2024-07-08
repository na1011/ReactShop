package com.reactshop.item;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemVO {

    private long id;
    private String title;
    private String img;
    private String content;
    private int price;

    @NotNull
    private int quantity;
    private int sum;

    public ItemVO(String title, String img, String content, int price) {
        this.title = title;
        this.img = img;
        this.content = content;
        this.price = price;
    }

    public int calSum(int quantity) {
        this.quantity = quantity;
        this.sum = quantity * price;
        return sum;
    }
}
