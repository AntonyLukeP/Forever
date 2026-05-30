package com.rabbitstore.cart.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AddToCartRequest {

    private UUID productId;

    private Integer qantity;

    private String size;

    private String color;

    private String guestId;

}
