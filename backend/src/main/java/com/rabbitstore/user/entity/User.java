package com.rabbitstore.user.entity;

import com.rabbitstore.common.entity.BaseEntity;
import com.rabbitstore.common.enums.Role;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Column(nullable = false,unique = true)
    private  String email;

    @Column(nullable = false)
    private  String password;

    @Enumerated(EnumType.STRING)
    private Role role;
}
