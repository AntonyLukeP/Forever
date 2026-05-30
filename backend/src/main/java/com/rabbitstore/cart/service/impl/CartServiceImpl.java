package com.rabbitstore.cart.service.impl;

import com.rabbitstore.cart.dto.AddToCartRequest;
import com.rabbitstore.cart.dto.CartItemResponse;
import com.rabbitstore.cart.dto.CartResponse;
import com.rabbitstore.cart.entity.Cart;
import com.rabbitstore.cart.entity.CartItem;
import com.rabbitstore.cart.repository.CartItemRepository;
import com.rabbitstore.cart.repository.CartRepository;
import com.rabbitstore.cart.service.CartService;
import com.rabbitstore.product.entity.Product;
import com.rabbitstore.product.repository.ProductRepository;
import com.rabbitstore.user.entity.User;
import com.rabbitstore.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final ProductRepository productRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    @Transactional
    public CartResponse addToCart(AddToCartRequest request, UUID userId) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(()-> new RuntimeException("Product Not Found"));
        if(product.getStock()< request.getQantity()){
            throw new RuntimeException("Insufficient stock");
        }
        Cart cart = getOrcreatecart(request.getGuestId(),userId);

        CartItem cartItem = cartItemRepository.findByCartIdAndProductIdAndSizeAndColor(
                cart.getId(),
                product.getId(),
                request.getSize(),
                request.getColor()
        ).orElse(null);

        if(cartItem!=null){
            cartItem.setQuantity(cartItem.getQuantity() + request.getQantity());
        }else {
            cartItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQantity())
                    .size(request.getSize())
                    .color(request.getColor())
                    .price(
                            product.getDiscountPrice()!=null
                            ? product.getDiscountPrice()
                                    : product.getPrice()
                    ).build();
            cart.getItems().add(cartItem);
        }
        cartRepository.save(cart);
        return mapToCartResponse(cart);
    }

    @Override
    public CartResponse getCart(String guestId, UUID userId) {

        Cart cart;

        if (userId!=null) {
            cart = cartRepository.findByUserId(userId)
                    .orElseThrow(()-> new RuntimeException("Cart Not Found"));
        } else {

            cart = cartRepository.findByGuestId(guestId)
                    .orElseThrow(() ->
                            new RuntimeException("Cart not found"));
        }
        return mapToCartResponse(cart);
    }

    private Cart getOrcreatecart(String guestId, UUID userId) {
        if(userId!=null){
            return cartRepository.findByUserId(userId)
                    .orElseGet(()->{
                        User user = userRepository.findById(userId)
                                .orElseThrow(()->  new RuntimeException("User Not Found"));

                        Cart newCart = Cart.builder().
                        user(user).build();

                        return cartRepository.save(newCart);

                    });
        }
        return cartRepository.findByGuestId(guestId)
                .orElseGet(()->{
                    Cart guestCart = Cart.builder()
                            .guestId(guestId).build();
                    return cartRepository.save(guestCart);
                });
    }

    private CartResponse mapToCartResponse(Cart cart) {
        List<CartItemResponse> items =
                cart.getItems()
                        .stream()
                        .map(item ->
                                CartItemResponse.builder()
                                        .productId(item.getProduct().getId())
                                        .name(item.getProduct().getName())
                                        .image(item.getProduct()
                                                .getImages()
                                                .isEmpty()
                                        ?null:item.getProduct()
                                                .getImages()
                                                .get(0)
                                                .getUrl())
                                        .price(item.getPrice())
                                        .quantity(item.getQuantity())
                                        .size(item.getSize())
                                        .color(item.getColor())
                                        .build()).toList();
        double totalPrice = cart.getItems()
                .stream().mapToDouble(item->
                        item.getPrice()*item.getQuantity()).sum();

        return CartResponse.builder()
                .cartId(cart.getId()).
                cartItems(items)
                .cartTotalPrice(totalPrice)
                .build();

    }


}
