package com.reactshop.item;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class ItemRepository {

    @PostConstruct
    public void init() {
        save(new ItemVO("White and Black", "shoes1","Born in France", 120000));
        save(new ItemVO("Red Knit", "shoes2","Born in Seoul", 110000));
        save(new ItemVO("Grey Yordan", "shoes3", "Born in the States", 130000));
    }

    @Getter
    private Map<Long, ItemVO> store = new HashMap<>();
    private long sequence = 0L;

    public void save(ItemVO item) {
        item.setId(++sequence);
        store.put(item.getId(), item);
    }

    public Optional<ItemVO> findById(Long itemId) {
        return Optional.ofNullable(store.get(itemId));
    }

    public void order(ItemVO item) {
        item.setTitle("새로운 주문");
        store.replace(1L, item);
    }

    public void clearStore() {
        store.clear();
    }
}
