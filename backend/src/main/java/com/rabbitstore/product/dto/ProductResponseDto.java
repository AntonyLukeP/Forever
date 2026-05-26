package com.rabbitstore.product.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
public class ProductResponseDto {

    private UUID id;

    private String name;

    private String description;

    private Double price;

    private Double discountPrice;

    private String category;

    private String gender;

    private String sku;

    private String brand;

    private String collection;

    private Integer stock;

    private Boolean isBestSeller;

    private List<String> colors;

    private List<String> sizes;

    private List<String> materials;

    private List<ProductImageRequest> images;

}
