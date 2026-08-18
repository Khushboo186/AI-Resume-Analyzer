package com.khushboo.resumeanalyzer.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import com.khushboo.resumeanalyzer.dto.ParsedResumeData;
import com.khushboo.resumeanalyzer.exception.FileUploadException;

@Service
public class PDFParserService {

    /**
     * Extract text from PDF file
     */
    public String extractTextFromPDF(String filePath) {
        try {
            File file = new File(filePath);
            if (!file.exists()) {
                throw new FileUploadException("PDF file not found: " + filePath);
            }

            PDDocument document = PDDocument.load(file);
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();

            return text;
        } catch (IOException e) {
            throw new FileUploadException("Error extracting text from PDF: " + e.getMessage());
        }
    }

    /**
     * Parse resume data from extracted text
     */
    public ParsedResumeData parseResumeData(String text) {
        ParsedResumeData data = new ParsedResumeData();

        // Extract email
        data.setEmail(extractEmail(text));

        // Extract phone
        data.setPhone(extractPhone(text));

        // Extract skills
        data.setSkills(extractSkills(text));

        // Extract experience
        data.setExperience(extractExperience(text));

        // Extract education
        data.setEducation(extractEducation(text));

        return data;
    }

    /**
     * Extract email from text
     */
    private String extractEmail(String text) {
        Pattern emailPattern = Pattern.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
        Matcher matcher = emailPattern.matcher(text);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    /**
     * Extract phone number from text
     */
    private String extractPhone(String text) {
        Pattern phonePattern = Pattern
                .compile("(?:\\+?91)?[\\s.-]?\\d{10}|(?:\\d{3})[\\s.-]?(?:\\d{3})[\\s.-]?(?:\\d{4})");
        Matcher matcher = phonePattern.matcher(text);
        if (matcher.find()) {
            return matcher.group();
        }
        return null;
    }

    /**
     * Extract skills from text using keyword matching
     */
    private List<String> extractSkills(String text) {
        List<String> skills = new ArrayList<>();
        String lowerText = text.toLowerCase();

        // Common technical skills
        String[] technicalSkills = {
                "java", "python", "javascript", "typescript", "c++", "c#", "php", "ruby", "go", "rust",
                "html", "css", "react", "angular", "vue", "nodejs", "express", "spring", "django", "flask",
                "mysql", "mongodb", "postgresql", "oracle", "sql server",
                "aws", "azure", "gcp", "kubernetes", "docker",
                "git", "jenkins", "maven", "gradle", "npm", "webpack",
                "rest api", "graphql", "microservices", "sql", "nosql",
                "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
                "data analysis", "power bi", "tableau", "excel",
                "agile", "scrum", "jira", "confluence"
        };

        for (String skill : technicalSkills) {
            if (lowerText.contains(skill) && !skills.contains(skill)) {
                skills.add(skill);
            }
        }

        return skills;
    }

    /**
     * Extract experience (years, job titles, companies)
     */
    private String extractExperience(String text) {
        StringBuilder experience = new StringBuilder();

        // Look for common experience keywords
        String[] keywords = { "experience", "employment", "work experience", "professional experience" };
        int startIndex = -1;

        for (String keyword : keywords) {
            int index = text.toLowerCase().indexOf(keyword);
            if (index != -1) {
                startIndex = index;
                break;
            }
        }

        if (startIndex != -1) {
            // Extract text after experience section (first 500 chars or until next major
            // section)
            int endIndex = Math.min(startIndex + 1000, text.length());
            String experienceSection = text.substring(startIndex, endIndex);

            // Extract years of experience
            Pattern yearsPattern = Pattern.compile("(\\d+)\\+?\\s*(?:years?|yrs?)");
            Matcher matcher = yearsPattern.matcher(experienceSection.toLowerCase());

            if (matcher.find()) {
                experience.append(matcher.group()).append(". ");
            }

            experience.append(experienceSection.substring(0, Math.min(300, experienceSection.length())));
        }

        return experience.toString().trim();
    }

    /**
     * Extract education details
     */
    private String extractEducation(String text) {
        StringBuilder education = new StringBuilder();

        // Look for education keywords
        String[] keywords = { "education", "academic", "degree", "university", "college" };
        int startIndex = -1;

        for (String keyword : keywords) {
            int index = text.toLowerCase().indexOf(keyword);
            if (index != -1) {
                startIndex = index;
                break;
            }
        }

        if (startIndex != -1) {
            // Extract text after education section
            int endIndex = Math.min(startIndex + 800, text.length());
            String educationSection = text.substring(startIndex, endIndex);

            // Look for degree patterns
            Pattern degreePattern = Pattern
                    .compile("(B\\.?(?:A|S|Tech|Com)|M\\.?(?:A|S|Tech|Com)|PhD|Bachelor|Master)");
            Matcher matcher = degreePattern.matcher(educationSection);

            while (matcher.find()) {
                education.append(matcher.group()).append(", ");
            }

            if (education.length() == 0) {
                education.append(educationSection.substring(0, Math.min(200, educationSection.length())));
            }
        }

        return education.toString().trim();
    }
}
