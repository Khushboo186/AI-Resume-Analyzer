package com.khushboo.resumeanalyzer.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.khushboo.resumeanalyzer.entity.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findByResumeId(Long resumeId);

    void deleteByResumeId(Long resumeId);
}
