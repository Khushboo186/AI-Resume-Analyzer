package com.khushboo.resumeanalyzer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.khushboo.resumeanalyzer.dto.ResumeUploadResponse;
import com.khushboo.resumeanalyzer.entity.Resume;
import com.khushboo.resumeanalyzer.service.ResumeService;
import com.khushboo.resumeanalyzer.service.UserService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private UserService userService;

    /**
     * Upload a new resume
     */
    @PostMapping("/upload")
    public ResponseEntity<ResumeUploadResponse> uploadResume(@RequestParam("file") MultipartFile file) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Long userId = userService.getUserIdByEmail(email);

        ResumeUploadResponse response = resumeService.uploadResume(userId, file);
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    /**
     * Get all resumes of the user
     */
    @GetMapping
    public ResponseEntity<List<Resume>> getUserResumes() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Long userId = userService.getUserIdByEmail(email);

        List<Resume> resumes = resumeService.getUserResumes(userId);
        return ResponseEntity.ok(resumes);
    }

    /**
     * Get a specific resume by ID
     */
    @GetMapping("/{resumeId}")
    public ResponseEntity<Resume> getResume(@PathVariable Long resumeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Long userId = userService.getUserIdByEmail(email);

        Resume resume = resumeService.getResumeById(resumeId, userId);
        return ResponseEntity.ok(resume);
    }

    /**
     * Delete a resume by ID
     */
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<?> deleteResume(@PathVariable Long resumeId) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Long userId = userService.getUserIdByEmail(email);

        resumeService.deleteResume(resumeId, userId);
        return ResponseEntity.ok(java.util.Map.of("message", "Resume deleted successfully!"));
    }
}
