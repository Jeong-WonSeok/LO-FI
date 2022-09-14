package com.ssafy.lofi.config.security;

import com.ssafy.lofi.db.entity.User;
import com.ssafy.lofi.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.Collections;

@RequiredArgsConstructor
@Service
@Slf4j
// 인증 과정 중 실제 Database에 회원을 데이터를 조회하는UserDetailsService를 구현
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        System.out.println("loadUserByUsername: "+username);
        User user = userRepository.findByEmail(username).orElseThrow(() -> new RuntimeException("Not Found User"));
        return new UserDetailsImpl(
                user.getEmail(),
                user.getPw(),
                user.getId(),
                user.getPoint(),
                user.getProvider(),
                Collections.singleton(new SimpleGrantedAuthority(user.getRole().getValue()))
        );
    }

}