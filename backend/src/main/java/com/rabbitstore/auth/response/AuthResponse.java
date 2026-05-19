package com.rabbitstore.auth.response;

import com.rabbitstore.common.enums.Role;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Builder
public class AuthResponse {

    private UUID id;

    private String name;

    private String email;

    private Role role;

    private String token;

}
