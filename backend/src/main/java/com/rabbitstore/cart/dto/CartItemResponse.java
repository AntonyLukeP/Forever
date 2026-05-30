package com.rabbitstore.cart.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class CartItemResponse {
    private UUID productId;

    private String name;

    private String image;

    private Double price;

    private Integer quantity;

    private String size;

    private String color;
}
