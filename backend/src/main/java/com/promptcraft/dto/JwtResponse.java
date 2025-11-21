package com.promptcraft.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long userId;
    private String email;
    private String role;
    private String subscriptionTier;
    
    public JwtResponse(String accessToken, String refreshToken, Long userId, String email, String role, String subscriptionTier) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.userId = userId;
        this.email = email;
        this.role = role;
        this.subscriptionTier = subscriptionTier;
    }
}
