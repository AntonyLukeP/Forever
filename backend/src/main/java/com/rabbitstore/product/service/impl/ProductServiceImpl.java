package com.rabbitstore.product.service.impl;

import com.rabbitstore.product.dto.CreateProductRequest;
import com.rabbitstore.product.dto.ProductFilterRequest;
import com.rabbitstore.product.dto.ProductImageRequest;
import com.rabbitstore.product.dto.ProductResponseDto;
import com.rabbitstore.product.entity.Product;
import com.rabbitstore.product.entity.ProductImage;
import com.rabbitstore.product.repository.ProductRepository;
import com.rabbitstore.product.service.ProductService;
import com.rabbitstore.product.specification.ProductSpecification;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;
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
                .collection(request.getCollection())
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

    @Override
    public List<ProductResponseDto> getAllProducts(ProductFilterRequest filter) {

        Pageable pageable = PageRequest.of(
                filter.getPage(),
                filter.getLimit()
        );

        Page<Product> productPage = productRepository.findAll(
                ProductSpecification.filterProducts(filter),
                pageable
        );

        return productPage
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponseDto getProductById(UUID productId) {
        Product product = productRepository.findById(productId).orElseThrow(()->
                new RuntimeException("Product Not Found"));
        return mapToResponse(product);
    }

    @Override
    public List<ProductResponseDto> getSimilarProducts(UUID productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        return productRepository.findTop4ByCategoryAndGenderAndIdNot(
                product.getCategory(),
                product.getGender(),
                product.getId()
                ).stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public ProductResponseDto getBestSellerProduct() {
        Product product = productRepository
                .findFirstByIsBestSellerTrue()
                .orElseThrow(() -> new RuntimeException("Product Not Found"));
        return mapToResponse(product);
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
                .collection(product.getCollection())
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
