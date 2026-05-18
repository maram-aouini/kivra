package com.kivra.backend.controller;

import com.kivra.backend.dto.UserContentRequest;
import com.kivra.backend.dto.UserContentResponse;
import com.kivra.backend.entity.ContentStatus;
import com.kivra.backend.entity.ContentType;
import com.kivra.backend.service.UserContentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
@RequiredArgsConstructor
public class UserContentController {

    private final UserContentService userContentService;

    @GetMapping
    public ResponseEntity<List<UserContentResponse>> getAll(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam(required = false) ContentType type,
            @RequestParam(required = false) ContentStatus status) {
        return ResponseEntity.ok(
                userContentService.getAll(userDetails.getUsername(), type, status));
    }

    @PostMapping
    public ResponseEntity<UserContentResponse> add(
            @AuthenticationPrincipal UserDetails userDetails,
            @Valid @RequestBody UserContentRequest request) {
        return ResponseEntity.ok(
                userContentService.add(userDetails.getUsername(), request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserContentResponse> update(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id,
            @Valid @RequestBody UserContentRequest request) {
        return ResponseEntity.ok(
                userContentService.update(userDetails.getUsername(), id, request));
    }

    @PatchMapping("/{id}/favorite")
    public ResponseEntity<UserContentResponse> toggleFavorite(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        return ResponseEntity.ok(
                userContentService.toggleFavorite(userDetails.getUsername(), id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        userContentService.delete(userDetails.getUsername(), id);
        return ResponseEntity.noContent().build();
    }
}