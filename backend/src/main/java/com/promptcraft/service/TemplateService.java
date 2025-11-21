package com.promptcraft.service;

import com.promptcraft.dto.TemplateRequest;
import com.promptcraft.dto.TemplateResponse;
import com.promptcraft.model.Favorite;
import com.promptcraft.model.Template;
import com.promptcraft.model.Template.Category;
import com.promptcraft.model.User;
import com.promptcraft.repository.FavoriteRepository;
import com.promptcraft.repository.TemplateRepository;
import com.promptcraft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TemplateService {
    
    @Autowired
    private TemplateRepository templateRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private FavoriteRepository favoriteRepository;
    
    public Page<TemplateResponse> getAllPublicTemplates(Pageable pageable, String email) {
        Page<Template> templates = templateRepository.findByIsPublicTrue(pageable);
        return templates.map(template -> mapToResponse(template, email));
    }
    
    public Page<TemplateResponse> searchTemplates(String searchTerm, Pageable pageable, String email) {
        Page<Template> templates = templateRepository.searchPublicTemplates(searchTerm, pageable);
        return templates.map(template -> mapToResponse(template, email));
    }
    
    public Page<TemplateResponse> getTemplatesByCategory(Category category, Pageable pageable, String email) {
        Page<Template> templates = templateRepository.findByCategoryAndIsPublicTrue(category, pageable);
        return templates.map(template -> mapToResponse(template, email));
    }
    
    public Page<TemplateResponse> getTemplatesByForDevs(Boolean forDevs, Pageable pageable, String email) {
        Page<Template> templates = templateRepository.findByForDevsAndIsPublicTrue(forDevs, pageable);
        return templates.map(template -> mapToResponse(template, email));
    }
    
    public TemplateResponse getTemplateById(Long id, String email) {
        Template template = templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        return mapToResponse(template, email);
    }
    
    @Transactional
    public TemplateResponse createTemplate(TemplateRequest request, String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        Template template = new Template();
        template.setTitle(request.getTitle());
        template.setContent(request.getContent());
        template.setDescription(request.getDescription());
        template.setCategory(request.getCategory() != null ? request.getCategory() : Category.OTHER);
        template.setForDevs(request.getForDevs());
        template.setIsPublic(request.getIsPublic());
        template.setIsOfficial(false);
        template.setUser(user);
        
        template = templateRepository.save(template);
        return mapToResponse(template, email);
    }
    
    @Transactional
    public TemplateResponse updateTemplate(Long id, TemplateRequest request, String email) {
        Template template = templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!template.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to update this template");
        }
        
        template.setTitle(request.getTitle());
        template.setContent(request.getContent());
        template.setDescription(request.getDescription());
        template.setCategory(request.getCategory());
        template.setForDevs(request.getForDevs());
        template.setIsPublic(request.getIsPublic());
        
        template = templateRepository.save(template);
        return mapToResponse(template, email);
    }
    
    @Transactional
    public void deleteTemplate(Long id, String email) {
        Template template = templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!template.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You don't have permission to delete this template");
        }
        
        templateRepository.delete(template);
    }
    
    @Transactional
    public void incrementUsageCount(Long id) {
        Template template = templateRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));
        template.incrementUsageCount();
        templateRepository.save(template);
    }
    
    private TemplateResponse mapToResponse(Template template, String email) {
        TemplateResponse response = new TemplateResponse();
        response.setId(template.getId());
        response.setTitle(template.getTitle());
        response.setContent(template.getContent());
        response.setDescription(template.getDescription());
        response.setCategory(template.getCategory());
        response.setForDevs(template.getForDevs());
        response.setIsPublic(template.getIsPublic());
        response.setIsOfficial(template.getIsOfficial());
        response.setUsageCount(template.getUsageCount());
        response.setFavoriteCount(template.getFavoriteCount());
        response.setCreatedAt(template.getCreatedAt());
        response.setUpdatedAt(template.getUpdatedAt());
        
        if (template.getUser() != null) {
            response.setUserId(template.getUser().getId());
            response.setCreatorEmail(template.getUser().getEmail());
        }
        
        if (email != null) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                response.setIsFavorited(
                    favoriteRepository.existsByUserIdAndTemplateId(user.getId(), template.getId())
                );
            }
        }
        
        return response;
    }
}
