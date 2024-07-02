package com.reactshop.item;

import lombok.Getter;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;

@Repository
public class ItemRepository {

    @Getter
    private Map<Long, ItemVO> store = new HashMap<>();
    private long sequence = 0L;

    public void save(ItemVO item) {
        item.setId(++sequence);
        store.put(item.getId(), item);
    }

    public ItemVO findById(Long itemId) {
        return store.get(itemId);
    }

    public void clearStore() {
        store.clear();
    }
}
