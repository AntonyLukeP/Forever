package com.rabbitstore.cart.service;

import com.rabbitstore.cart.dto.AddToCartRequest;
import com.rabbitstore.cart.dto.CartResponse;

import java.util.UUID;

public interface CartService {
    CartResponse addToCart(AddToCartRequest request, UUID userId);
    CartResponse getCart(String guestId ,UUID userId);
}
