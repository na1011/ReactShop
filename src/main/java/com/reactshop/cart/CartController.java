package com.reactshop.cart;

import com.reactshop.item.ItemRepository;
import com.reactshop.item.ItemVO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class CartController {

    private final ItemRepository itemRepository;

    public Map<Long, CartVO> store = new HashMap<>();
    public long seq = 0L;

    @PostMapping("/api/{itemId}/addCart")
    public ResponseEntity<?> addCart(@PathVariable("itemId") long itemId) {
        Optional<ItemVO> item = itemRepository.findById(itemId);
        if (item.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found");
        }

        CartVO cart = store.computeIfAbsent(seq, k -> createCart(k));

        cart.addItem(item.get());
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getCartList")
    public ResponseEntity<?> getCartList() {
        CartVO cart = store.computeIfAbsent(seq, k -> createCart(k));
        return ResponseEntity.ok(cart.getCartList());
    }

    public CartVO createCart(Long id) {
        return CartVO.builder()
                .id(id)
                .cartList(new ArrayList<>())
                .build();
    }
}
