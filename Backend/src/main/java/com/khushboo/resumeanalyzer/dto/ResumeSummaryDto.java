package com.khushboo.resumeanalyzer.dto;

import java.time.LocalDateTime;

public class ResumeSummaryDto {
    private Long id;
    private String fileName;
    private Long fileSize;
    private Integer atsScore;
    private int skillsCount;
    private LocalDateTime createdAt;

    public ResumeSummaryDto() {
    }

    public ResumeSummaryDto(Long id, String fileName, Long fileSize, Integer atsScore, int skillsCount, LocalDateTime createdAt) {
        this.id = id;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.atsScore = atsScore;
        this.skillsCount = skillsCount;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public Long getFileSize() {
        return fileSize;
    }

    public void setFileSize(Long fileSize) {
        this.fileSize = fileSize;
    }

    public Integer getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(Integer atsScore) {
        this.atsScore = atsScore;
    }

    public int getSkillsCount() {
        return skillsCount;
    }

    public void setSkillsCount(int skillsCount) {
        this.skillsCount = skillsCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
