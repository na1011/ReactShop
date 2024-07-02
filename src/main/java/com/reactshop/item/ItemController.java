package com.reactshop.item;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemRepository itemRepository;

    @PostConstruct
    public void init() {
        itemRepository.save(new ItemVO("White and Black", "shoes1","Born in France", 120000));
        itemRepository.save(new ItemVO("Red Knit", "shoes2","Born in Seoul", 110000));
        itemRepository.save(new ItemVO("Grey Yordan", "shoes3", "Born in the States", 130000));
    }

    @GetMapping("/items")
    public ResponseEntity<Map<Long, ItemVO>> getItems() {
        return new ResponseEntity<>(itemRepository.getStore(), HttpStatus.OK);
    }

    @GetMapping("/detail/{itemId}")
    public ResponseEntity<ItemVO> itemDetail(@PathVariable("itemId") Long itemID) {
        return new ResponseEntity<>(itemRepository.findById(itemID), HttpStatus.OK);
    }
}
