package com.khushboo.resumeanalyzer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.khushboo.resumeanalyzer.dto.LoginRequest;
import com.khushboo.resumeanalyzer.dto.RegisterRequest;
import com.khushboo.resumeanalyzer.entity.User;
import com.khushboo.resumeanalyzer.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(RegisterRequest request) {

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already registered!";
        }

        User user = new User();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User registered successfully!";
    }

    public String loginUser(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            return "Invalid Email or Password!";
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return "Invalid Email or Password!";
        }

        return "Login Successful!";
    }
}