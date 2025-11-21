package com.promptcraft.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "usage_stats")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsageStats {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private LocalDateTime date; // Date of usage
    
    @Column(nullable = false)
    private Integer dailyCount = 0;
    
    @Column(nullable = false)
    private Integer monthlyCount = 0;
    
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    
    public void incrementDailyCount() {
        this.dailyCount++;
    }
    
    public void incrementMonthlyCount() {
        this.monthlyCount++;
    }
}
