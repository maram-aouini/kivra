package com.kivra.backend.dto;

import com.kivra.backend.entity.ContentStatus;
import com.kivra.backend.entity.ContentType;
import com.kivra.backend.entity.UserContent;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class UserContentResponse {

    private Long id;
    private String title;
    private ContentType type;
    private ContentStatus status;
    private String externalId;
    private String coverUrl;
    private String description;
    private Integer rating;
    private String notes;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private Integer imagePosition;

    public static UserContentResponse fromEntity(UserContent uc) {
        UserContentResponse res = new UserContentResponse();
        res.setId(uc.getId());
        res.setTitle(uc.getTitle());
        res.setType(uc.getType());
        res.setStatus(uc.getStatus());
        res.setExternalId(uc.getExternalId());
        res.setCoverUrl(uc.getCoverUrl());
        res.setDescription(uc.getDescription());
        res.setRating(uc.getRating());
        res.setNotes(uc.getNotes());
        res.setStartDate(uc.getStartDate());
        res.setEndDate(uc.getEndDate());
        res.setCreatedAt(uc.getCreatedAt());
        res.setImagePosition(uc.getImagePosition());
        return res;
    }
}