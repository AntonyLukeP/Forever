package com.rabbitstore.cart.entity;

import com.rabbitstore.common.entity.BaseEntity;
import com.rabbitstore.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Cart extends BaseEntity {

    @OneToOne(fetch= FetchType.LAZY)
    @JoinColumn(name="user_id")
    private User  user;

    private String guestId;

    @OneToMany(
            mappedBy = "cart",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<CartItem> items = new ArrayList<>();

}
