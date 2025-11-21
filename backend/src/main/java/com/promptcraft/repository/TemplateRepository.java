package com.promptcraft.repository;

import com.promptcraft.model.Template;
import com.promptcraft.model.Template.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends JpaRepository<Template, Long> {
    
    // Find all public templates
    Page<Template> findByIsPublicTrue(Pageable pageable);
    
    // Find templates by category
    Page<Template> findByCategoryAndIsPublicTrue(Category category, Pageable pageable);
    
    // Find templates by user
    Page<Template> findByUserId(Long userId, Pageable pageable);
    
    // Find dev templates
    Page<Template> findByForDevsAndIsPublicTrue(Boolean forDevs, Pageable pageable);
    
    // Search templates
    @Query("SELECT t FROM Template t WHERE t.isPublic = true AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(t.content) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Template> searchPublicTemplates(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    // Find official templates
    Page<Template> findByIsOfficialTrueAndIsPublicTrue(Pageable pageable);
    
    // Find popular templates
    @Query("SELECT t FROM Template t WHERE t.isPublic = true ORDER BY t.usageCount DESC")
    List<Template> findPopularTemplates(Pageable pageable);
}
