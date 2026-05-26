package com.rabbitstore.product.entity;

import com.rabbitstore.common.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private Double price;

    private Double discountPrice;

    private String category;

    private String gender;

    @Column(unique = true)
    private String sku;

    private String brand;

    private String collecion;

    private Integer stock;

    private Boolean isBestSeller = false;

    @ElementCollection
    @CollectionTable(
            name = "product_colors",
            joinColumns = @JoinColumn(name = "product_id")
    )
    private List<String> colors =  new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "product_sizes",
            joinColumns = @JoinColumn(name = "product_id")
    )
    private List<String> sizes =  new ArrayList<>();

    @ElementCollection
    @CollectionTable(
            name = "product_materials",
            joinColumns = @JoinColumn(name = "product_id")
    )
    private List<String> materials =  new ArrayList<>();

    @OneToMany(
            mappedBy = "product",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ProductImage> images = new ArrayList<>();
}
