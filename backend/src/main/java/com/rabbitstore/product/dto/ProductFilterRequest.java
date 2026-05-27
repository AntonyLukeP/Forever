package com.rabbitstore.product.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductFilterRequest {

    private String category;

    private String gender;

    private String brand;

    private String collection;

    private String color;

    private String size;

    private String material;

    private Double minPrice;

    private Double maxPrice;

    private String search;

    private String sortBy;

}
