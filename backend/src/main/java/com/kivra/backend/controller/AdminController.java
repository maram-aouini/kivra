package com.kivra.backend.controller;

import com.kivra.backend.entity.User;
import com.kivra.backend.entity.UserContent;
import com.kivra.backend.repository.UserContentRepository;
import com.kivra.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final UserContentRepository userContentRepository;

    private boolean isAdmin(UserDetails userDetails) {
        if (userDetails == null || userDetails.getUsername() == null) {
            return false;
        }
        return userRepository.findByEmail(userDetails.getUsername())
                .map(User::isAdmin)
                .orElse(false);
    }

    @GetMapping("/stats")
    public ResponseEntity<?> getStats(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null || !isAdmin(userDetails)) return ResponseEntity.status(403).build();

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalContents", userContentRepository.count());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users/search")
    public ResponseEntity<?> searchUsers(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestParam String query) {
        if (userDetails == null || !isAdmin(userDetails)) return ResponseEntity.status(403).build();

        List<User> users = userRepository.findByEmailContainsIgnoreCaseOrUsernameContainsIgnoreCase(query, query);
        List<Map<String, Object>> result = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("username", u.getUsername());
            map.put("email", u.getEmail());
            map.put("admin", u.isAdmin());
            map.put("createdAt", u.getCreatedAt());
            map.put("contentCount", userContentRepository.findByUserId(u.getId()).size());
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/users")
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal UserDetails userDetails) {
        if (userDetails == null || !isAdmin(userDetails)) return ResponseEntity.status(403).build();

        List<User> users = userRepository.findAll();
        List<Map<String, Object>> result = users.stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("username", u.getUsername());
            map.put("email", u.getEmail());
            map.put("admin", u.isAdmin());
            map.put("createdAt", u.getCreatedAt());
            map.put("contentCount", userContentRepository.findByUserId(u.getId()).size());
            return map;
        }).toList();

        return ResponseEntity.ok(result);
    }

    @GetMapping("/users/{userId}/contents")
    public ResponseEntity<?> getUserContents(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long userId) {
        if (userDetails == null || !isAdmin(userDetails)) return ResponseEntity.status(403).build();
        return ResponseEntity.ok(userContentRepository.findByUserId(userId));
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<?> deleteUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long userId) {
        if (userDetails == null || !isAdmin(userDetails)) return ResponseEntity.status(403).build();

        List<UserContent> userContents = userContentRepository.findByUserId(userId);
        userContentRepository.deleteAll(userContents);

        userRepository.deleteById(userId);
        return ResponseEntity.noContent().build();
    }
}
