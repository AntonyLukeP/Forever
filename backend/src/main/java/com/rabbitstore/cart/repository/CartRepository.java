package com.rabbitstore.cart.repository;

import com.rabbitstore.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface CartRepository extends JpaRepository<Cart, UUID> {

    Optional<Cart> findByGuestId(String guestId);
    Optional<Cart> findByUserId(UUID userId);
}
