package com.rabbitstore.cart.dto;

import com.rabbitstore.cart.entity.CartItem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class CartResponse {

    private UUID cartId;

    private List<CartItemResponse> cartItems;

    private double cartTotalPrice;

}
