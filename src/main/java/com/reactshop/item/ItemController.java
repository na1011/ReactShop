package com.reactshop.item;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ItemController {

    private final ItemRepository itemRepository;

    @GetMapping("/items")
    public ResponseEntity<Map<Long, ItemVO>> getItems() {
        return new ResponseEntity<>(itemRepository.getStore(), HttpStatus.OK);
    }

    @GetMapping("/details/{itemId}")
    public ResponseEntity<?> itemDetail(@PathVariable("itemId") Long itemID) {
        Optional<ItemVO> item = itemRepository.findById(itemID);
        if (item.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }

        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @PostMapping("/detail/{itemId}/order")
    public ResponseEntity<?> itemOrder(@PathVariable("itemId") Long itemId,
                                       @Validated @RequestBody ItemVO item,
                                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        if (item.calSum(item.getQuantity()) < 1000000) {
            bindingResult.reject("totalPriceMin", "총액은 1,000,000원 이상이어야 합니다.");
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }

        itemRepository.order(item);

        return ResponseEntity.ok("ok");
    }
}
