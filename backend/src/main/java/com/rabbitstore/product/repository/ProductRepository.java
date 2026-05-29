package com.rabbitstore.product.repository;

import com.rabbitstore.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> , JpaSpecificationExecutor<Product>{
    Optional<Product> findBySku(String sku);
    List<Product> findTop4ByCategoryAndGenderAndIdNot(String category, String gender, UUID id);
    Optional<Product>findFirstByIsBestSellerTrue();
}
