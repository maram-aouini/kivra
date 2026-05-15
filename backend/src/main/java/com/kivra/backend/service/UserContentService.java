package com.kivra.backend.service;

import com.kivra.backend.dto.UserContentRequest;
import com.kivra.backend.dto.UserContentResponse;
import com.kivra.backend.entity.ContentStatus;
import com.kivra.backend.entity.ContentType;
import com.kivra.backend.entity.User;
import com.kivra.backend.entity.UserContent;
import com.kivra.backend.repository.UserContentRepository;
import com.kivra.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserContentService {

    private final UserContentRepository userContentRepository;
    private final UserRepository userRepository;

    private User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato"));
    }

    public List<UserContentResponse> getAll(String email, ContentType type, ContentStatus status) {
        User user = getUserByEmail(email);
        List<UserContent> contents;

        if (type != null && status != null) {
            contents = userContentRepository.findByUserIdAndTypeAndStatus(user.getId(), type, status);
        } else if (type != null) {
            contents = userContentRepository.findByUserIdAndType(user.getId(), type);
        } else if (status != null) {
            contents = userContentRepository.findByUserIdAndStatus(user.getId(), status);
        } else {
            contents = userContentRepository.findByUserId(user.getId());
        }

        return contents.stream()
                .map(UserContentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    public UserContentResponse add(String email, UserContentRequest request) {
        User user = getUserByEmail(email);

        UserContent content = new UserContent();
        content.setUser(user);
        content.setTitle(request.getTitle());
        content.setType(request.getType());
        content.setStatus(request.getStatus());
        content.setExternalId(request.getExternalId());
        content.setCoverUrl(request.getCoverUrl());
        content.setDescription(request.getDescription());
        content.setRating(request.getRating());
        content.setNotes(request.getNotes());
        content.setStartDate(request.getStartDate());
        content.setEndDate(request.getEndDate());
        content.setImagePosition(request.getImagePosition());

        return UserContentResponse.fromEntity(userContentRepository.save(content));
    }

    public UserContentResponse update(String email, Long id, UserContentRequest request) {
        User user = getUserByEmail(email);

        UserContent content = userContentRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Contenuto non trovato"));

        content.setTitle(request.getTitle());
        content.setType(request.getType());
        content.setStatus(request.getStatus());
        content.setExternalId(request.getExternalId());
        content.setCoverUrl(request.getCoverUrl());
        content.setDescription(request.getDescription());
        content.setRating(request.getRating());
        content.setNotes(request.getNotes());
        content.setStartDate(request.getStartDate());
        content.setEndDate(request.getEndDate());
        content.setImagePosition(request.getImagePosition());

        return UserContentResponse.fromEntity(userContentRepository.save(content));
    }

    public void delete(String email, Long id) {
        User user = getUserByEmail(email);
        UserContent content = userContentRepository.findByIdAndUserId(id, user.getId())
                .orElseThrow(() -> new RuntimeException("Contenuto non trovato"));
        userContentRepository.delete(content);
    }
}