package com.rabbitstore.product.service;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductResponseDto;

public interface ProductService {

    ProductResponseDto createProduct(CreateProductRequest createProductRequest);

}
