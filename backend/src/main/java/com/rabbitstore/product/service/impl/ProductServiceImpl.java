package com.rabbitstore.product.service.impl;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductImageRequest;
import com.rabbitstore.product.dto.ProductResponseDto;
import com.rabbitstore.product.entity.Product;
import com.rabbitstore.product.entity.ProductImage;
import com.rabbitstore.product.repository.ProductRepository;
import com.rabbitstore.product.service.ProductService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    @Transactional
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
                ProductImage productImage = ProductImage.builder()
                        .url(imageRequest.getUrl())
                        .altText(imageRequest.getAltText())
                        .product(product)
                        .build();

                product.getImages().add(productImage);
            });
        }

        Product savedProduct = productRepository.save(product);

        return mapToResponse(savedProduct);
    }

    private ProductResponseDto mapToResponse(Product product) {

        return ProductResponseDto.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPrice(product.getDiscountPrice())
                .category(product.getCategory())
                .gender(product.getGender())
                .sku(product.getSku())
                .brand(product.getBrand())
                .collection(product.getCollecion())
                .stock(product.getStock())
                .isBestSeller(product.getIsBestSeller())
                .colors(product.getColors())
                .sizes(product.getSizes())
                .materials(product.getMaterials())

                .images(
                        product.getImages()
                                .stream()
                                .map(image ->
                                        ProductImageRequest.builder()
                                                .url(image.getUrl())
                                                .altText(image.getAltText())
                                                .build()
                                )
                                .collect(Collectors.toList())
                )

                .build();
    }

}
