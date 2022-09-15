package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.User;
import com.ssafy.lofi.db.repository.UserRepository;
import com.ssafy.lofi.dto.UserRole;
import com.ssafy.lofi.dto.request.SignUpDto;
import com.ssafy.lofi.dto.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public User signUp(SignUpDto signUpDto) {
        User user = User.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .role(UserRole.ROLE_USER)
                .provider(signUpDto.getProvider())
                .build();
        return userRepository.save(user);
    }

    public UserDto mypage(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 유저가 없습니다. email=" + email));;
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPoint(user.getPoint());
        return userDto;
    }

    public void deleteuser(Long id) {
        userRepository.deleteById(id);
    }
}
