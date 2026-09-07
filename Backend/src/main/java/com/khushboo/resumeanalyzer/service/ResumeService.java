package com.khushboo.resumeanalyzer.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.khushboo.resumeanalyzer.dto.DashboardStatsResponse;
import com.khushboo.resumeanalyzer.dto.ParsedResumeData;
import com.khushboo.resumeanalyzer.dto.ResumeAnalysisResponse;
import com.khushboo.resumeanalyzer.dto.ResumeSummaryDto;
import com.khushboo.resumeanalyzer.entity.Resume;
import com.khushboo.resumeanalyzer.entity.Skill;
import com.khushboo.resumeanalyzer.entity.User;
import com.khushboo.resumeanalyzer.exception.FileUploadException;
import com.khushboo.resumeanalyzer.repository.ResumeRepository;
import com.khushboo.resumeanalyzer.repository.SkillRepository;
import com.khushboo.resumeanalyzer.repository.UserRepository;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private PDFParserService pdfParserService;

    @Autowired
    private AIEngineService aiEngineService;

    @Value("${app.upload.dir:uploads/resumes}")
    private String uploadDir;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String[] ALLOWED_EXTENSIONS = { "pdf", "doc", "docx" };

    @Transactional
    public ResumeAnalysisResponse uploadResume(Long userId, MultipartFile file) {
        try {
            validateFile(file);

            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new FileUploadException("User not found"));

            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);

            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;

            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.write(filePath, file.getBytes());

            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFileName(originalFileName);
            resume.setFilePath(filePath.toString());
            resume.setFileSize(file.getSize());

            // Extract and parse
            String extractedText = "";
            ParsedResumeData parsedData = new ParsedResumeData();
            if ("pdf".equalsIgnoreCase(fileExtension)) {
                try {
                    extractedText = pdfParserService.extractTextFromPDF(filePath.toString());
                    parsedData = pdfParserService.parseResumeData(extractedText);
                } catch (Exception e) {
                    System.err.println("Error parsing PDF text: " + e.getMessage());
                }
            }

            resume.setExtractedText(extractedText);
            resume.setEmail(parsedData.getEmail());
            resume.setPhone(parsedData.getPhone());
            resume.setExperience(parsedData.getExperience());
            resume.setEducation(parsedData.getEducation());

            List<String> skills = parsedData.getSkills() != null ? parsedData.getSkills() : new ArrayList<>();
            AIEngineService.AnalysisResult analysis = aiEngineService.analyzeResume(
                extractedText, parsedData.getEmail(), parsedData.getPhone(), skills
            );

            resume.setAtsScore(analysis.getAtsScore());
            Resume savedResume = resumeRepository.save(resume);

            // Store skills
            for (String skillName : skills) {
                Skill skill = new Skill(savedResume, skillName);
                skillRepository.save(skill);
            }

            // Build analysis response
            List<String> missingSkills = aiEngineService.identifyMissingSkills(skills);

            ResumeAnalysisResponse response = new ResumeAnalysisResponse();
            response.setId(savedResume.getId());
            response.setFileName(savedResume.getFileName());
            response.setFileSize(savedResume.getFileSize());
            response.setAtsScore(analysis.getAtsScore());
            response.setRating(analysis.getRating());
            response.setEmail(savedResume.getEmail());
            response.setPhone(savedResume.getPhone());
            response.setExperience(savedResume.getExperience());
            response.setEducation(savedResume.getEducation());
            response.setSkills(skills);
            response.setMissingSkills(missingSkills);
            response.setSuggestions(analysis.getSuggestions());
            response.setSectionScores(analysis.getSectionScores());
            response.setWordCount(analysis.getWordCount());
            response.setCreatedAt(savedResume.getCreatedAt());

            return response;

        } catch (IOException e) {
            throw new FileUploadException("Error uploading file: " + e.getMessage());
        }
    }

    public ResumeAnalysisResponse getResumeAnalysis(Long resumeId, Long userId) {
        Resume resume = getResumeById(resumeId, userId);
        List<Skill> skillEntities = skillRepository.findByResumeId(resumeId);
        List<String> skills = skillEntities.stream().map(Skill::getSkillName).collect(Collectors.toList());

        AIEngineService.AnalysisResult analysis = aiEngineService.analyzeResume(
            resume.getExtractedText(), resume.getEmail(), resume.getPhone(), skills
        );

        List<String> missingSkills = aiEngineService.identifyMissingSkills(skills);

        ResumeAnalysisResponse response = new ResumeAnalysisResponse();
        response.setId(resume.getId());
        response.setFileName(resume.getFileName());
        response.setFileSize(resume.getFileSize());
        response.setAtsScore(resume.getAtsScore() != null ? resume.getAtsScore() : analysis.getAtsScore());
        response.setRating(analysis.getRating());
        response.setEmail(resume.getEmail());
        response.setPhone(resume.getPhone());
        response.setExperience(resume.getExperience());
        response.setEducation(resume.getEducation());
        response.setSkills(skills);
        response.setMissingSkills(missingSkills);
        response.setSuggestions(analysis.getSuggestions());
        response.setSectionScores(analysis.getSectionScores());
        response.setWordCount(analysis.getWordCount());
        response.setCreatedAt(resume.getCreatedAt());

        return response;
    }

    public List<ResumeSummaryDto> getUserResumeSummaries(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new FileUploadException("User not found"));
        List<Resume> resumes = resumeRepository.findByUserId(userId);

        List<ResumeSummaryDto> list = new ArrayList<>();
        for (Resume r : resumes) {
            List<Skill> s = skillRepository.findByResumeId(r.getId());
            list.add(new ResumeSummaryDto(
                r.getId(),
                r.getFileName(),
                r.getFileSize(),
                r.getAtsScore() != null ? r.getAtsScore() : 0,
                s.size(),
                r.getCreatedAt()
            ));
        }
        return list;
    }

    public DashboardStatsResponse getDashboardStats(Long userId) {
        List<ResumeSummaryDto> resumes = getUserResumeSummaries(userId);

        long totalResumes = resumes.size();
        int averageAtsScore = 0;
        int totalSkillsCount = 0;

        if (totalResumes > 0) {
            int scoreSum = 0;
            for (ResumeSummaryDto r : resumes) {
                scoreSum += (r.getAtsScore() != null ? r.getAtsScore() : 0);
                totalSkillsCount += r.getSkillsCount();
            }
            averageAtsScore = (int) Math.round((double) scoreSum / totalResumes);
        }

        // Sort recent resumes by creation date descending
        resumes.sort((a, b) -> {
            if (a.getCreatedAt() == null || b.getCreatedAt() == null) return 0;
            return b.getCreatedAt().compareTo(a.getCreatedAt());
        });

        List<ResumeSummaryDto> recent = resumes.stream().limit(5).collect(Collectors.toList());

        return new DashboardStatsResponse(totalResumes, averageAtsScore, totalSkillsCount, recent);
    }

    public Resume getResumeById(Long resumeId, Long userId) {
        return resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new FileUploadException("Resume not found"));
    }

    @Transactional
    public void deleteResume(Long resumeId, Long userId) {
        Resume resume = getResumeById(resumeId, userId);

        try {
            Path filePath = Paths.get(resume.getFilePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            System.err.println("Warning: could not delete file from disk: " + e.getMessage());
        }

        skillRepository.deleteByResumeId(resumeId);
        resumeRepository.deleteByIdAndUserId(resumeId, userId);
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new FileUploadException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new FileUploadException("File size exceeds maximum limit of 5MB");
        }

        String extension = getFileExtension(file.getOriginalFilename());
        boolean isAllowed = false;
        for (String ext : ALLOWED_EXTENSIONS) {
            if (ext.equalsIgnoreCase(extension)) {
                isAllowed = true;
                break;
            }
        }

        if (!isAllowed) {
            throw new FileUploadException("File type not allowed. Allowed types: PDF, DOC, DOCX");
        }
    }

    private String getFileExtension(String fileName) {
        if (fileName == null || fileName.isEmpty()) {
            throw new FileUploadException("Invalid file name");
        }
        int lastIndex = fileName.lastIndexOf('.');
        if (lastIndex > 0) {
            return fileName.substring(lastIndex + 1).toLowerCase();
        }
        throw new FileUploadException("File extension not found");
    }
}
