package com.rabbitstore.cart.controller;

import com.rabbitstore.cart.dto.AddToCartRequest;
import com.rabbitstore.cart.dto.CartResponse;
import com.rabbitstore.cart.repository.CartRepository;
import com.rabbitstore.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping
    public CartResponse addToCart(
    @Valid @RequestBody AddToCartRequest request,
    Authentication authentication)
    {
        UUID userId = null;

        if(authentication!=null &&
        authentication.isAuthenticated()){
            userId = UUID.fromString(authentication.getName());
        }

        return cartService.addToCart(request, userId);
    }

    @GetMapping
    public CartResponse getCart(
            @RequestParam(required = false)
            String guestId,
            Authentication authentication
    ){
        UUID userId = null;

        if(authentication!=null &&
        authentication.isAuthenticated()){
            userId = UUID.fromString(authentication.getName());
        }
        return cartService.getCart(guestId, userId);
    }
}
