package com.kivra.backend.dto;

import com.kivra.backend.entity.ContentStatus;
import com.kivra.backend.entity.ContentType;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserContentRequest {

    @NotBlank(message = "Titolo obbligatorio")
    private String title;

    @NotNull(message = "Tipo obbligatorio")
    private ContentType type;

    @NotNull(message = "Stato obbligatorio")
    private ContentStatus status;

    private String externalId;
    private String coverUrl;
    private String description;
    private boolean favorite = false;

    @Min(1) @Max(10)
    private Integer rating;

    private String notes;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer imagePosition;
}