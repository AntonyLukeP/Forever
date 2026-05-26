package com.rabbitstore.auth.controller;

import com.rabbitstore.auth.dto.LoginRequest;
import com.rabbitstore.auth.dto.RegisterRequest;
import com.rabbitstore.auth.response.AuthResponse;
import com.rabbitstore.auth.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest  request
            ){
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request
    ){
        return authService.login(request);
    }

}
