package com.khushboo.resumeanalyzer.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.khushboo.resumeanalyzer.dto.LoginRequest;
import com.khushboo.resumeanalyzer.dto.LoginResponse;
import com.khushboo.resumeanalyzer.dto.RegisterRequest;
import com.khushboo.resumeanalyzer.dto.RegisterResponse;
import com.khushboo.resumeanalyzer.dto.UserProfileDto;
import com.khushboo.resumeanalyzer.entity.Resume;
import com.khushboo.resumeanalyzer.entity.User;
import com.khushboo.resumeanalyzer.repository.ResumeRepository;
import com.khushboo.resumeanalyzer.repository.UserRepository;
import com.khushboo.resumeanalyzer.security.JwtTokenProvider;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ResumeRepository resumeRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    public RegisterResponse registerUser(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new RegisterResponse("Email already registered!", request.getEmail(), false);
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);
        return new RegisterResponse("User registered successfully!", request.getEmail(), true);
    }

    public LoginResponse loginUser(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return new LoginResponse(null, "Invalid Email or Password!", null, null);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(null, "Invalid Email or Password!", null, null);
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return new LoginResponse(token, "Login Successful!", user.getEmail(), user.getId());
    }

    public Long getUserIdByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    public UserProfileDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Resume> resumes = resumeRepository.findByUserId(userId);
        long totalResumes = resumes.size();
        int averageScore = 0;
        if (totalResumes > 0) {
            int sum = 0;
            for (Resume r : resumes) {
                sum += (r.getAtsScore() != null ? r.getAtsScore() : 0);
            }
            averageScore = (int) Math.round((double) sum / totalResumes);
        }

        return new UserProfileDto(
            user.getId(),
            user.getFullName(),
            user.getEmail(),
            user.getCreatedAt(),
            totalResumes,
            averageScore
        );
    }
}