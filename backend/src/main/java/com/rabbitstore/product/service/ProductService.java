package com.rabbitstore.product.service;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductFilterRequest;
import com.rabbitstore.product.dto.ProductResponseDto;

import java.util.List;
import java.util.UUID;

public interface ProductService {

    ProductResponseDto createProduct(CreateProductRequest createProductRequest);
    List<ProductResponseDto> getAllProducts(ProductFilterRequest filter);
    ProductResponseDto getProductById(UUID productId);
    List<ProductResponseDto> getSimilarProducts(UUID productId);
    ProductResponseDto getBestSellerProduct();
}
