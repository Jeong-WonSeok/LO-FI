package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.User;
import com.ssafy.lofi.db.repository.UserRepository;
import com.ssafy.lofi.dto.UserRole;
import com.ssafy.lofi.dto.request.SignUpDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public void signUp(SignUpDto signUpDto) {
        User user = User.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .role(UserRole.ROLE_USER)
                .provider(signUpDto.getProvider())
                .build();
        userRepository.save(user);
    }
}
