package com.khushboo.resumeanalyzer.dto;

import java.time.LocalDateTime;

public class UserProfileDto {
    private Long id;
    private String fullName;
    private String email;
    private LocalDateTime createdAt;
    private long totalResumes;
    private int averageAtsScore;

    public UserProfileDto() {
    }

    public UserProfileDto(Long id, String fullName, String email, LocalDateTime createdAt, long totalResumes, int averageAtsScore) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.createdAt = createdAt;
        this.totalResumes = totalResumes;
        this.averageAtsScore = averageAtsScore;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public long getTotalResumes() {
        return totalResumes;
    }

    public void setTotalResumes(long totalResumes) {
        this.totalResumes = totalResumes;
    }

    public int getAverageAtsScore() {
        return averageAtsScore;
    }

    public void setAverageAtsScore(int averageAtsScore) {
        this.averageAtsScore = averageAtsScore;
    }
}
