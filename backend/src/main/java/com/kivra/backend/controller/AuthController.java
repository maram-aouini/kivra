package com.kivra.backend.controller;

import com.kivra.backend.dto.AuthResponse;
import com.kivra.backend.dto.LoginRequest;
import com.kivra.backend.dto.RegisterRequest;
import com.kivra.backend.service.AuthService;
import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PutMapping("/profile/username")
    public ResponseEntity<?> updateUsername(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateUsernameRequest request) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(authService.updateUsername(userDetails.getUsername(), request.getNewUsername()));
    }

    @PutMapping("/profile/password")
    public ResponseEntity<?> updatePassword(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdatePasswordRequest request) {
        if (userDetails == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(authService.updatePassword(userDetails.getUsername(), request.getOldPassword(), request.getNewPassword()));
    }

    @Data
    public static class UpdateUsernameRequest {
        private String newUsername;
    }

    @Data
    public static class UpdatePasswordRequest {
        private String oldPassword;
        private String newPassword;
    }
}
