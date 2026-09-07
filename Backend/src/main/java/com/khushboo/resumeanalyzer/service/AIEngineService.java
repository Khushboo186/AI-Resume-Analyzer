package com.khushboo.resumeanalyzer.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

import com.khushboo.resumeanalyzer.dto.SuggestionDto;

@Service
public class AIEngineService {

    // Comprehensive Skill Dictionary
    private static final String[] ALL_SKILLS = {
        // Languages
        "java", "python", "javascript", "typescript", "c++", "c#", "c", "php", "ruby", "go", "golang", "rust", "kotlin", "swift", "scala", "r", "dart",
        // Frontend
        "html", "html5", "css", "css3", "sass", "scss", "react", "react.js", "reactjs", "angular", "angularjs", "vue", "vue.js", "next.js", "nextjs", "redux", "tailwind", "tailwindcss", "bootstrap", "material-ui", "webpack", "vite", "jquery",
        // Backend
        "node.js", "nodejs", "express", "express.js", "spring", "spring boot", "django", "flask", "fastapi", "asp.net", "laravel", "rails", "graphql", "rest api", "restful api", "microservices", "soap", "grpc",
        // Databases
        "mysql", "postgresql", "postgres", "mongodb", "oracle", "sql server", "sqlite", "redis", "elasticsearch", "cassandra", "dynamodb", "mariadb", "firebase", "supabase", "sql", "nosql",
        // Cloud & DevOps
        "aws", "amazon web services", "azure", "gcp", "google cloud", "docker", "kubernetes", "jenkins", "gitlab ci", "github actions", "terraform", "ansible", "linux", "unix", "bash", "nginx", "apache",
        // Tools & Methodologies
        "git", "github", "gitlab", "bitbucket", "jira", "confluence", "trello", "agile", "scrum", "kanban", "postman", "swagger", "maven", "gradle", "npm", "yarn", "ci/cd", "ci cd",
        // Testing
        "junit", "mockito", "jest", "cypress", "selenium", "pytest", "unit testing", "integration testing", "tdd",
        // AI / ML / Data
        "machine learning", "deep learning", "nlp", "computer vision", "tensorflow", "pytorch", "keras", "scikit-learn", "pandas", "numpy", "power bi", "tableau", "excel", "spark", "hadoop",
        // Soft Skills
        "problem solving", "communication", "leadership", "teamwork", "critical thinking", "time management", "collaboration", "adaptability", "mentoring"
    };

    // Recommended Core Skills for Software/Tech Roles
    private static final String[] INDUSTRY_CORE_SKILLS = {
        "git", "docker", "rest api", "sql", "ci/cd", "unit testing", "agile", "microservices", "linux", "cloud"
    };

    // Action Verbs
    private static final String[] ACTION_VERBS = {
        "achieved", "implemented", "developed", "engineered", "designed", "architected", "optimized",
        "reduced", "increased", "boosted", "delivered", "deployed", "scaled", "automated", "created",
        "spearheaded", "integrated", "managed", "collaborated", "transformed", "streamlined", "enhanced"
    };

    /**
     * Extract all matching skills from text
     */
    public List<String> extractSkills(String text) {
        if (text == null || text.isBlank()) {
            return new ArrayList<>();
        }

        String lowerText = " " + text.toLowerCase(Locale.ROOT) + " ";
        Set<String> matched = new HashSet<>();

        for (String skill : ALL_SKILLS) {
            String skillPattern = "(?i)\\b" + Pattern.quote(skill) + "\\b";
            if (Pattern.compile(skillPattern).matcher(lowerText).find()) {
                // Capitalize first letter of each word for clean display
                matched.add(capitalizeWords(skill));
            }
        }

        return new ArrayList<>(matched);
    }

    /**
     * Identify missing high-demand skills
     */
    public List<String> identifyMissingSkills(List<String> detectedSkills) {
        Set<String> detectedLower = new HashSet<>();
        for (String s : detectedSkills) {
            detectedLower.add(s.toLowerCase(Locale.ROOT));
        }

        List<String> missing = new ArrayList<>();
        for (String core : INDUSTRY_CORE_SKILLS) {
            boolean found = false;
            for (String userSkill : detectedLower) {
                if (userSkill.contains(core) || core.contains(userSkill)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                missing.add(capitalizeWords(core));
            }
        }
        return missing;
    }

    /**
     * Calculate comprehensive ATS Score (0 - 100) and section breakdown
     */
    public AnalysisResult analyzeResume(String text, String email, String phone, List<String> skills) {
        String lowerText = text != null ? text.toLowerCase(Locale.ROOT) : "";

        // 1. Contact Information Score (Max 15 pts)
        int contactScore = 0;
        if (email != null && !email.isBlank()) contactScore += 6;
        if (phone != null && !phone.isBlank()) contactScore += 5;
        if (lowerText.contains("linkedin") || lowerText.contains("github") || lowerText.contains("portfolio")) {
            contactScore += 4;
        }

        // 2. Section Structure Score (Max 25 pts)
        int structureScore = 0;
        boolean hasSummary = lowerText.contains("summary") || lowerText.contains("objective") || lowerText.contains("about me");
        boolean hasExperience = lowerText.contains("experience") || lowerText.contains("employment") || lowerText.contains("work history");
        boolean hasEducation = lowerText.contains("education") || lowerText.contains("academic") || lowerText.contains("degree") || lowerText.contains("university");
        boolean hasProjects = lowerText.contains("project") || lowerText.contains("portfolio") || lowerText.contains("certification") || lowerText.contains("certificate");
        boolean hasSkillsSec = lowerText.contains("skills") || lowerText.contains("technologies") || lowerText.contains("competencies");

        if (hasSummary) structureScore += 5;
        if (hasExperience) structureScore += 8;
        if (hasEducation) structureScore += 5;
        if (hasProjects) structureScore += 4;
        if (hasSkillsSec) structureScore += 3;

        // 3. Skills Score (Max 30 pts)
        int skillsScore = 0;
        int skillCount = skills != null ? skills.size() : 0;
        if (skillCount >= 15) {
            skillsScore = 30;
        } else if (skillCount >= 10) {
            skillsScore = 25;
        } else if (skillCount >= 6) {
            skillsScore = 18;
        } else if (skillCount >= 3) {
            skillsScore = 10;
        } else {
            skillsScore = 4;
        }

        // 4. Impact, Metrics & Action Verbs (Max 20 pts)
        int impactScore = 0;
        int actionVerbCount = 0;
        for (String verb : ACTION_VERBS) {
            if (lowerText.contains(verb)) {
                actionVerbCount++;
            }
        }
        if (actionVerbCount >= 6) impactScore += 10;
        else if (actionVerbCount >= 3) impactScore += 6;
        else if (actionVerbCount >= 1) impactScore += 3;

        // Check for quantifiable metrics (e.g., 20%, $50K, 100+, 5x)
        Pattern metricsPattern = Pattern.compile("(\\d+\\+?\\s*(%|percent|k|m|x|million|users|clients|requests|seconds|ms))|(\\$?\\d{2,})");
        Matcher matcher = metricsPattern.matcher(lowerText);
        int metricMatches = 0;
        while (matcher.find()) {
            metricMatches++;
        }
        if (metricMatches >= 5) impactScore += 10;
        else if (metricMatches >= 2) impactScore += 6;
        else if (metricMatches >= 1) impactScore += 3;

        // 5. Length & Readability (Max 10 pts)
        int contentScore = 0;
        String[] words = text != null ? text.trim().split("\\s+") : new String[0];
        int wordCount = words.length;

        if (wordCount >= 300 && wordCount <= 1200) {
            contentScore = 10;
        } else if (wordCount > 1200 && wordCount <= 1800) {
            contentScore = 7;
        } else if (wordCount >= 150) {
            contentScore = 5;
        } else {
            contentScore = 2;
        }

        // Total ATS Score calculation
        int totalScore = contactScore + structureScore + skillsScore + impactScore + contentScore;
        totalScore = Math.min(Math.max(totalScore, 15), 98); // Clamp between 15 and 98

        // Rating
        String rating;
        if (totalScore >= 80) rating = "Excellent (Ready for Applications)";
        else if (totalScore >= 65) rating = "Good (Minor Optimization Needed)";
        else if (totalScore >= 50) rating = "Average (Needs Keyword & Impact Polish)";
        else rating = "Needs Improvement (Missing Key Sections/Keywords)";

        // Generate AI Suggestions
        List<SuggestionDto> suggestions = generateSuggestions(
            email, phone, hasSummary, hasExperience, hasEducation, hasProjects,
            skillCount, actionVerbCount, metricMatches, wordCount, lowerText
        );

        Map<String, Integer> sectionScores = new HashMap<>();
        sectionScores.put("contactScore", (int) Math.round((contactScore / 15.0) * 100));
        sectionScores.put("structureScore", (int) Math.round((structureScore / 25.0) * 100));
        sectionScores.put("skillsScore", (int) Math.round((skillsScore / 30.0) * 100));
        sectionScores.put("impactScore", (int) Math.round((impactScore / 20.0) * 100));
        sectionScores.put("contentScore", (int) Math.round((contentScore / 10.0) * 100));

        return new AnalysisResult(totalScore, rating, suggestions, sectionScores, wordCount);
    }

    private List<SuggestionDto> generateSuggestions(
        String email, String phone, boolean hasSummary, boolean hasExperience,
        boolean hasEducation, boolean hasProjects, int skillCount,
        int actionVerbCount, int metricMatches, int wordCount, String text
    ) {
        List<SuggestionDto> list = new ArrayList<>();

        if (email == null || email.isBlank()) {
            list.add(new SuggestionDto("CONTACT", "Add a professional email address at the top header of your resume.", "HIGH"));
        }
        if (phone == null || phone.isBlank()) {
            list.add(new SuggestionDto("CONTACT", "Include your active phone number with country code for recruiter outreach.", "HIGH"));
        }
        if (!text.contains("linkedin") && !text.contains("github")) {
            list.add(new SuggestionDto("CONTACT", "Add links to your LinkedIn profile and GitHub portfolio to build credibility.", "MEDIUM"));
        }

        if (!hasExperience) {
            list.add(new SuggestionDto("STRUCTURE", "No clear 'Experience' or 'Work History' section detected. Add standard section headings.", "HIGH"));
        }
        if (!hasEducation) {
            list.add(new SuggestionDto("STRUCTURE", "Include an 'Education' section stating degree, university name, and graduation year.", "MEDIUM"));
        }
        if (!hasSummary) {
            list.add(new SuggestionDto("STRUCTURE", "Include a 2-3 line Professional Summary at the top highlighting your core expertise.", "LOW"));
        }

        if (skillCount < 8) {
            list.add(new SuggestionDto("SKILLS", "Add more technical skills, libraries, databases, and tools relevant to your target job.", "HIGH"));
        }

        if (metricMatches < 3) {
            list.add(new SuggestionDto("IMPACT", "Quantify your achievements using numbers, percentages, and metrics (e.g., 'Improved load time by 30%', 'Served 10K+ users').", "HIGH"));
        }

        if (actionVerbCount < 4) {
            list.add(new SuggestionDto("IMPACT", "Start bullet points with strong power action verbs like 'Architected', 'Optimized', 'Engineered', 'Streamlined'.", "MEDIUM"));
        }

        if (wordCount < 300) {
            list.add(new SuggestionDto("CONTENT", "Your resume appears too short (" + wordCount + " words). Expand your project descriptions and responsibilities.", "MEDIUM"));
        } else if (wordCount > 1400) {
            list.add(new SuggestionDto("CONTENT", "Your resume is quite lengthy (" + wordCount + " words). Keep it concise (1 to 2 pages maximum).", "LOW"));
        }

        return list;
    }

    private String capitalizeWords(String str) {
        if (str == null || str.isEmpty()) return str;
        String[] words = str.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (w.equalsIgnoreCase("sql") || w.equalsIgnoreCase("aws") || w.equalsIgnoreCase("gcp") ||
                w.equalsIgnoreCase("api") || w.equalsIgnoreCase("html") || w.equalsIgnoreCase("css") ||
                w.equalsIgnoreCase("ci/cd") || w.equalsIgnoreCase("nlp") || w.equalsIgnoreCase("ui")) {
                sb.append(w.toUpperCase(Locale.ROOT)).append(" ");
            } else if (w.length() > 0) {
                sb.append(Character.toUpperCase(w.charAt(0))).append(w.substring(1).toLowerCase(Locale.ROOT)).append(" ");
            }
        }
        return sb.toString().trim();
    }

    public static class AnalysisResult {
        private final int atsScore;
        private final String rating;
        private final List<SuggestionDto> suggestions;
        private final Map<String, Integer> sectionScores;
        private final int wordCount;

        public AnalysisResult(int atsScore, String rating, List<SuggestionDto> suggestions, Map<String, Integer> sectionScores, int wordCount) {
            this.atsScore = atsScore;
            this.rating = rating;
            this.suggestions = suggestions;
            this.sectionScores = sectionScores;
            this.wordCount = wordCount;
        }

        public int getAtsScore() { return atsScore; }
        public String getRating() { return rating; }
        public List<SuggestionDto> getSuggestions() { return suggestions; }
        public Map<String, Integer> getSectionScores() { return sectionScores; }
        public int getWordCount() { return wordCount; }
    }
}
