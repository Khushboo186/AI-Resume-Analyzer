package com.khushboo.resumeanalyzer.dto;

import java.util.List;

public class DashboardStatsResponse {
    private long totalResumes;
    private int averageAtsScore;
    private int totalSkillsCount;
    private List<ResumeSummaryDto> recentResumes;

    public DashboardStatsResponse() {
    }

    public DashboardStatsResponse(long totalResumes, int averageAtsScore, int totalSkillsCount, List<ResumeSummaryDto> recentResumes) {
        this.totalResumes = totalResumes;
        this.averageAtsScore = averageAtsScore;
        this.totalSkillsCount = totalSkillsCount;
        this.recentResumes = recentResumes;
    }

    public long getTotalResumes() {
        return totalResumes;
    }

    public void setTotalResumes(long totalResumes) {
        this.totalResumes = totalResumes;
    }

    public int getAverageAtsScore() {
        return averageAtsScore;
    }

    public void setAverageAtsScore(int averageAtsScore) {
        this.averageAtsScore = averageAtsScore;
    }

    public int getTotalSkillsCount() {
        return totalSkillsCount;
    }

    public void setTotalSkillsCount(int totalSkillsCount) {
        this.totalSkillsCount = totalSkillsCount;
    }

    public List<ResumeSummaryDto> getRecentResumes() {
        return recentResumes;
    }

    public void setRecentResumes(List<ResumeSummaryDto> recentResumes) {
        this.recentResumes = recentResumes;
    }
}
