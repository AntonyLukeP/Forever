package com.rabbitstore.product.controller;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductResponseDto;
import com.rabbitstore.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ProductResponseDto createProduct(
            @Valid @RequestBody CreateProductRequest createProductRequest
            ){
        return productService.createProduct(createProductRequest);
    }

}
