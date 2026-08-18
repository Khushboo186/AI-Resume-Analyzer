package com.khushboo.resumeanalyzer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.khushboo.resumeanalyzer.dto.LoginRequest;
import com.khushboo.resumeanalyzer.dto.LoginResponse;
import com.khushboo.resumeanalyzer.dto.RegisterRequest;
import com.khushboo.resumeanalyzer.dto.RegisterResponse;
import com.khushboo.resumeanalyzer.entity.User;
import com.khushboo.resumeanalyzer.repository.UserRepository;
import com.khushboo.resumeanalyzer.security.JwtTokenProvider;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
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
        System.out.println("Email received: " + request.getEmail());
        System.out.println("Password received: " + request.getPassword());

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);

        if (user == null) {
            System.out.println("User not found!");
            return new LoginResponse(null, "Invalid Email or Password!", null, null);
        }
        System.out.println("User found: " + user.getEmail());
        System.out.println("Stored password: " + user.getPassword());

        boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPassword());
        System.out.println("Password matches: " + passwordMatches);

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse(null, "Invalid Email or Password!", null, null);
        }

        String token = jwtTokenProvider.generateToken(user.getEmail());
        return new LoginResponse(token, "Login Successful!", user.getEmail(), user.getId());
    }
}