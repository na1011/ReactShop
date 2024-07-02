package com.reactshop.item;

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

    public ItemVO(String title, String img, String content, int price) {
        this.title = title;
        this.img = img;
        this.content = content;
        this.price = price;
    }
}
