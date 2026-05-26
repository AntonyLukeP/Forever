package com.rabbitstore.auth.service;

import com.rabbitstore.auth.dto.LoginRequest;
import com.rabbitstore.auth.dto.RegisterRequest;
import com.rabbitstore.auth.response.AuthResponse;

public interface AuthService {

    AuthResponse register(RegisterRequest registerRequest);
    AuthResponse login(LoginRequest loginRequest);

}
