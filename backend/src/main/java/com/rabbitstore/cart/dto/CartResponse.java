package com.rabbitstore.cart.dto;

import com.rabbitstore.cart.entity.CartItem;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class CartResponse {

    private UUID cartId;

    private List<CartItem> cartItems;

    private double cartTotalPrice;

}
