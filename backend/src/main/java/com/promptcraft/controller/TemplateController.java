package com.promptcraft.controller;

import com.promptcraft.dto.ApiResponse;
import com.promptcraft.dto.TemplateRequest;
import com.promptcraft.dto.TemplateResponse;
import com.promptcraft.model.Template.Category;
import com.promptcraft.service.TemplateService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/templates")
public class TemplateController {
    
    @Autowired
    private TemplateService templateService;
    
    @GetMapping("/public")
    public ResponseEntity<Page<TemplateResponse>> getAllPublicTemplates(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "DESC") String sortDir,
            Authentication authentication
    ) {
        Sort sort = sortDir.equalsIgnoreCase("ASC") ? 
                Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        String email = authentication != null ? authentication.getName() : null;
        Page<TemplateResponse> templates = templateService.getAllPublicTemplates(pageable, email);
        return ResponseEntity.ok(templates);
    }
    
    @GetMapping("/public/search")
    public ResponseEntity<Page<TemplateResponse>> searchTemplates(
            @RequestParam String query,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication
    ) {
        Pageable pageable = PageRequest.of(page, size);
        String email = authentication != null ? authentication.getName() : null;
        Page<TemplateResponse> templates = templateService.searchTemplates(query, pageable, email);
        return ResponseEntity.ok(templates);
    }
    
    @GetMapping("/public/category/{category}")
    public ResponseEntity<Page<TemplateResponse>> getTemplatesByCategory(
            @PathVariable Category category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication
    ) {
        Pageable pageable = PageRequest.of(page, size);
        String email = authentication != null ? authentication.getName() : null;
        Page<TemplateResponse> templates = templateService.getTemplatesByCategory(category, pageable, email);
        return ResponseEntity.ok(templates);
    }
    
    @GetMapping("/public/forDevs/{forDevs}")
    public ResponseEntity<Page<TemplateResponse>> getTemplatesByForDevs(
            @PathVariable Boolean forDevs,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            Authentication authentication
    ) {
        Pageable pageable = PageRequest.of(page, size);
        String email = authentication != null ? authentication.getName() : null;
        Page<TemplateResponse> templates = templateService.getTemplatesByForDevs(forDevs, pageable, email);
        return ResponseEntity.ok(templates);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getTemplateById(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            String email = authentication != null ? authentication.getName() : null;
            TemplateResponse template = templateService.getTemplateById(id, email);
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping
    public ResponseEntity<?> createTemplate(
            @Valid @RequestBody TemplateRequest request,
            Authentication authentication
    ) {
        try {
            TemplateResponse template = templateService.createTemplate(request, authentication.getName());
            return ResponseEntity.status(HttpStatus.CREATED).body(template);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTemplate(
            @PathVariable Long id,
            @Valid @RequestBody TemplateRequest request,
            Authentication authentication
    ) {
        try {
            TemplateResponse template = templateService.updateTemplate(id, request, authentication.getName());
            return ResponseEntity.ok(template);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTemplate(
            @PathVariable Long id,
            Authentication authentication
    ) {
        try {
            templateService.deleteTemplate(id, authentication.getName());
            return ResponseEntity.ok(new ApiResponse(true, "Template deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
    
    @PostMapping("/{id}/use")
    public ResponseEntity<?> incrementUsageCount(@PathVariable Long id) {
        try {
            templateService.incrementUsageCount(id);
            return ResponseEntity.ok(new ApiResponse(true, "Usage count incremented"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }
}
