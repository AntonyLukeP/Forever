package com.rabbitstore.product.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateProductRequest {

    @NotBlank
    private String name;

    private String description;

    @NotNull
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
