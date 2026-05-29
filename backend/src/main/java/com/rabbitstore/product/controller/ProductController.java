package com.rabbitstore.product.controller;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductFilterRequest;
import com.rabbitstore.product.dto.ProductResponseDto;
import com.rabbitstore.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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

    @GetMapping
    public List<ProductResponseDto> getAllProducts(ProductFilterRequest filter) {
        return productService.getAllProducts(filter);
    }

    @GetMapping("/{productId}")
    public ProductResponseDto getProductById(@PathVariable UUID productId) {
        return productService.getProductById(productId);
    }

    @GetMapping("/similar/{productId}")
    public List<ProductResponseDto> getSimilarProducts(@PathVariable UUID productId) {
        return productService.getSimilarProducts(productId);
    }

    @GetMapping("/best-seller")
    public ProductResponseDto getBestSellerProduct() {
        return productService.getBestSellerProduct();
    }

}
