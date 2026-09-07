package com.khushboo.resumeanalyzer.controller;

import java.util.List;
import java.util.Map;

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

import com.khushboo.resumeanalyzer.dto.DashboardStatsResponse;
import com.khushboo.resumeanalyzer.dto.ResumeAnalysisResponse;
import com.khushboo.resumeanalyzer.dto.ResumeSummaryDto;
import com.khushboo.resumeanalyzer.service.ResumeService;
import com.khushboo.resumeanalyzer.service.UserService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private UserService userService;

    private Long getCurrentUserId() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        return userService.getUserIdByEmail(email);
    }

    /**
     * Upload a new resume and perform AI ATS Analysis
     */
    @PostMapping("/upload")
    public ResponseEntity<ResumeAnalysisResponse> uploadResume(@RequestParam("file") MultipartFile file) {
        Long userId = getCurrentUserId();
        ResumeAnalysisResponse response = resumeService.uploadResume(userId, file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * Get all resumes of the current user
     */
    @GetMapping
    public ResponseEntity<List<ResumeSummaryDto>> getUserResumes() {
        Long userId = getCurrentUserId();
        List<ResumeSummaryDto> resumes = resumeService.getUserResumeSummaries(userId);
        return ResponseEntity.ok(resumes);
    }

    /**
     * Get dashboard stats for current user
     */
    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        Long userId = getCurrentUserId();
        DashboardStatsResponse stats = resumeService.getDashboardStats(userId);
        return ResponseEntity.ok(stats);
    }

    /**
     * Get a specific resume analysis by ID
     */
    @GetMapping("/{resumeId}")
    public ResponseEntity<ResumeAnalysisResponse> getResumeAnalysis(@PathVariable Long resumeId) {
        Long userId = getCurrentUserId();
        ResumeAnalysisResponse response = resumeService.getResumeAnalysis(resumeId, userId);
        return ResponseEntity.ok(response);
    }

    /**
     * Delete a resume by ID
     */
    @DeleteMapping("/{resumeId}")
    public ResponseEntity<?> deleteResume(@PathVariable Long resumeId) {
        Long userId = getCurrentUserId();
        resumeService.deleteResume(resumeId, userId);
        return ResponseEntity.ok(Map.of("message", "Resume deleted successfully!"));
    }
}
