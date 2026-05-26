package com.rabbitstore.product.service.impl;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductResponseDto;
import com.rabbitstore.product.entity.Product;
import com.rabbitstore.product.repository.ProductRepository;
import com.rabbitstore.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public ProductResponseDto createProduct(CreateProductRequest request) {

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .discountPrice(request.getDiscountPrice())
                .category(request.getCategory())
                .gender(request.getGender())
                .sku(request.getSku())
                .brand(request.getBrand())
                .collecion(request.getCollection())
                .stock(request.getStock())
                .isBestSeller(request.getIsBestSeller())
                .colors(request.getColors())
                .sizes(request.getSizes())
                .materials(request.getMaterials())
                .build();

        if(request.getImages() != null) {
            request.getImages().forEach(imageRequest -> {

            });
        }

    }

}
