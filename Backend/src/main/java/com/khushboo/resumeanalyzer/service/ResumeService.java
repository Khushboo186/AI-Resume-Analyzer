package com.khushboo.resumeanalyzer.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.khushboo.resumeanalyzer.dto.ParsedResumeData;
import com.khushboo.resumeanalyzer.dto.ResumeUploadResponse;
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

    @Value("${app.upload.dir:uploads/resumes}")
    private String uploadDir;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    private static final String[] ALLOWED_EXTENSIONS = { "pdf", "doc", "docx" };

    public ResumeUploadResponse uploadResume(Long userId, MultipartFile file) {
        try {
            // Validate file
            validateFile(file);

            // Check if user exists
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new FileUploadException("User not found"));

            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            Files.createDirectories(uploadPath);

            // Generate unique filename
            String originalFileName = file.getOriginalFilename();
            String fileExtension = getFileExtension(originalFileName);
            String uniqueFileName = UUID.randomUUID().toString() + "." + fileExtension;

            // Save file to disk
            Path filePath = uploadPath.resolve(uniqueFileName);
            Files.write(filePath, file.getBytes());

            // Save to database
            Resume resume = new Resume();
            resume.setUser(user);
            resume.setFileName(originalFileName);
            resume.setFilePath(filePath.toString());
            resume.setFileSize(file.getSize());

            Resume savedResume = resumeRepository.save(resume);

            // Parse resume if it's a PDF
            if ("pdf".equalsIgnoreCase(fileExtension)) {
                try {
                    parseAndStoreResumeData(savedResume, filePath.toString());
                } catch (Exception e) {
                    // Log error but don't fail upload
                    System.err.println("Error parsing PDF: " + e.getMessage());
                }
            }

            return new ResumeUploadResponse(
                    savedResume.getId(),
                    "Resume uploaded and parsed successfully!",
                    originalFileName,
                    savedResume.getFileSize(),
                    true);

        } catch (IOException e) {
            throw new FileUploadException("Error uploading file: " + e.getMessage());
        }
    }

    /**
     * Parse resume and store extracted data
     */
    private void parseAndStoreResumeData(Resume resume, String filePath) {
        // Extract text from PDF
        String extractedText = pdfParserService.extractTextFromPDF(filePath);
        resume.setExtractedText(extractedText);

        // Parse resume data
        ParsedResumeData parsedData = pdfParserService.parseResumeData(extractedText);

        // Store parsed data in resume
        resume.setEmail(parsedData.getEmail());
        resume.setPhone(parsedData.getPhone());
        resume.setExperience(parsedData.getExperience());
        resume.setEducation(parsedData.getEducation());

        // Save updated resume
        resumeRepository.save(resume);

        // Store skills in database
        if (parsedData.getSkills() != null && !parsedData.getSkills().isEmpty()) {
            for (String skillName : parsedData.getSkills()) {
                Skill skill = new Skill(resume, skillName);
                skillRepository.save(skill);
            }
        }
    }

    public List<Resume> getUserResumes(Long userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new FileUploadException("User not found"));
        return resumeRepository.findByUserId(userId);
    }

    public Resume getResumeById(Long resumeId, Long userId) {
        return resumeRepository.findByIdAndUserId(resumeId, userId)
                .orElseThrow(() -> new FileUploadException("Resume not found"));
    }

    public void deleteResume(Long resumeId, Long userId) {
        Resume resume = getResumeById(resumeId, userId);

        // Delete file from disk
        try {
            Path filePath = Paths.get(resume.getFilePath());
            Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new FileUploadException("Error deleting file: " + e.getMessage());
        }

        // Delete skills associated with resume
        skillRepository.deleteByResumeId(resumeId);

        // Delete from database
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
