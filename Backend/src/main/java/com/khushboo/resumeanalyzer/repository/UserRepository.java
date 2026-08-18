package com.khushboo.resumeanalyzer.repository;

import java.util.Optional;
import com.khushboo.resumeanalyzer.dto.LoginRequest;

import org.springframework.data.jpa.repository.JpaRepository;

import com.khushboo.resumeanalyzer.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

}