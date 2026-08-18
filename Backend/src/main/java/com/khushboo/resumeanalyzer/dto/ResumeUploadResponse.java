package com.khushboo.resumeanalyzer.dto;

public class ResumeUploadResponse {
    private Long resumeId;
    private String message;
    private String fileName;
    private Long fileSize;
    private boolean success;

    public ResumeUploadResponse(Long resumeId, String message, String fileName, Long fileSize, boolean success) {
        this.resumeId = resumeId;
        this.message = message;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.success = success;
    }

    public Long getResumeId() {
        return resumeId;
    }

    public void setResumeId(Long resumeId) {
        this.resumeId = resumeId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
