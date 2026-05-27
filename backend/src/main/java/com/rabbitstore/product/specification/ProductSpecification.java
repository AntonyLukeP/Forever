package com.rabbitstore.product.specification;


import com.rabbitstore.product.dto.ProductFilterRequest;
import com.rabbitstore.product.entity.Product;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
public class ProductSpecification {

    public static Specification<Product> filterProducts(
            ProductFilterRequest filter
    ) {
        return (root,query,criteriaBuilder) ->
        {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getCategory() != null) {
                predicates.add(
                        criteriaBuilder.equal(
                                root.get("category"),
                                filter.getCategory()
                        )
                );

            }

            if (filter.getGender() != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("gender"),
                                filter.getGender()
                        )
                );
            }

            if (filter.getBrand() != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("brand"),
                                filter.getBrand()
                        )
                );
            }

            if (filter.getCollection() != null) {

                predicates.add(
                        criteriaBuilder.equal(
                                root.get("collection"),
                                filter.getCollection()
                        )
                );
            }

            if (filter.getMinPrice() != null) {

                predicates.add(
                        criteriaBuilder.greaterThanOrEqualTo(
                                root.get("price"),
                                filter.getMinPrice()
                        )
                );
            }

            if (filter.getMaxPrice() != null) {

                predicates.add(
                        criteriaBuilder.lessThanOrEqualTo(
                                root.get("price"),
                                filter.getMaxPrice()
                        )
                );
            }

            if (filter.getSearch() != null) {

                predicates.add(
                        criteriaBuilder.like(
                                criteriaBuilder.lower(
                                        root.get("name")
                                ),
                                "%" + filter.getSearch()
                                        .toLowerCase() + "%"
                        )
                );
            }

            return criteriaBuilder.and(
                    predicates.toArray(new Predicate[0])
            );
        };
    }

}
