package com.kivra.backend.service;

import com.kivra.backend.dto.AuthResponse;
import com.kivra.backend.dto.LoginRequest;
import com.kivra.backend.dto.RegisterRequest;
import com.kivra.backend.entity.User;
import com.kivra.backend.repository.UserRepository;
import com.kivra.backend.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email già in uso");
        }
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username già in uso");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        String token = jwtUtils.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.isAdmin());
    }

    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));

        String token = jwtUtils.generateToken(user.getEmail());
        return new AuthResponse(token, user.getUsername(), user.getEmail(), user.isAdmin());
    }
}