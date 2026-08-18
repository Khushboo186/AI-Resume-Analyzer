package com.khushboo.resumeanalyzer.dto;

import java.util.List;

public class ParsedResumeData {
    private String email;
    private String phone;
    private List<String> skills;
    private String experience;
    private String education;

    public ParsedResumeData() {
    }

    public ParsedResumeData(String email, String phone, List<String> skills, String experience, String education) {
        this.email = email;
        this.phone = phone;
        this.skills = skills;
        this.experience = experience;
        this.education = education;
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

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
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
}
