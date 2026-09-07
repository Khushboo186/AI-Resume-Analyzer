package com.khushboo.resumeanalyzer.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class ResumeAnalysisResponse {
    private Long id;
    private String fileName;
    private Long fileSize;
    private int atsScore;
    private String rating; // "Excellent", "Good", "Average", "Needs Improvement"
    private String email;
    private String phone;
    private String experience;
    private String education;
    private List<String> skills;
    private List<String> missingSkills;
    private List<SuggestionDto> suggestions;
    private Map<String, Integer> sectionScores;
    private int wordCount;
    private LocalDateTime createdAt;

    public ResumeAnalysisResponse() {
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

    public int getAtsScore() {
        return atsScore;
    }

    public void setAtsScore(int atsScore) {
        this.atsScore = atsScore;
    }

    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getMissingSkills() {
        return missingSkills;
    }

    public void setMissingSkills(List<String> missingSkills) {
        this.missingSkills = missingSkills;
    }

    public List<SuggestionDto> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<SuggestionDto> suggestions) {
        this.suggestions = suggestions;
    }

    public Map<String, Integer> getSectionScores() {
        return sectionScores;
    }

    public void setSectionScores(Map<String, Integer> sectionScores) {
        this.sectionScores = sectionScores;
    }

    public int getWordCount() {
        return wordCount;
    }

    public void setWordCount(int wordCount) {
        this.wordCount = wordCount;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
