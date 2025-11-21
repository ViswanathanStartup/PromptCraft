package com.promptcraft.dto;

import com.promptcraft.model.Template.Category;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TemplateRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "Content is required")
    private String content;
    
    private String description;
    private Category category;
    private Boolean forDevs = false;
    private Boolean isPublic = true;
}
