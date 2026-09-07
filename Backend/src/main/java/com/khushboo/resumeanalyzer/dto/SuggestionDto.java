package com.khushboo.resumeanalyzer.dto;

public class SuggestionDto {
    private String type; // e.g., "IMPACT", "SKILLS", "FORMATTING", "SECTIONS"
    private String text;
    private String priority; // "HIGH", "MEDIUM", "LOW"

    public SuggestionDto() {
    }

    public SuggestionDto(String type, String text, String priority) {
        this.type = type;
        this.text = text;
        this.priority = priority;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }
}
