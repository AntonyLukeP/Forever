package com.rabbitstore.cart.repository;

import com.rabbitstore.cart.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartItemRepository extends JpaRepository<CartItem, UUID> {

    Optional<CartItem> findByCartIdAndProductIdAndSizeAndColor(UUID cartId, UUID productId, String size, String color);
}
