package com.promptcraft.dto;

import com.promptcraft.model.Template.Category;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TemplateResponse {
    private Long id;
    private String title;
    private String content;
    private String description;
    private Category category;
    private Boolean forDevs;
    private Boolean isPublic;
    private Boolean isOfficial;
    private Integer usageCount;
    private Integer favoriteCount;
    private Boolean isFavorited;
    private Long userId;
    private String creatorEmail;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
