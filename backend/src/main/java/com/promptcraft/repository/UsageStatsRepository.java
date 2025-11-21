package com.promptcraft.repository;

import com.promptcraft.model.UsageStats;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface UsageStatsRepository extends JpaRepository<UsageStats, Long> {
    Optional<UsageStats> findByUserIdAndDate(Long userId, LocalDateTime date);
}
