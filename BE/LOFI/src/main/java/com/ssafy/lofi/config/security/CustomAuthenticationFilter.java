package com.ssafy.lofi.config.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.lofi.dto.request.LoginDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Log4j2
public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    public CustomAuthenticationFilter(AuthenticationManager authenticationManager) {
        System.out.println("CustomAuthenticationFilter-CustomAuthenticationFilter");
        super.setAuthenticationManager(authenticationManager);
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        final UsernamePasswordAuthenticationToken authRequest;
        final LoginDto loginDto;
        System.out.println("CustomAuthenticationFilter-attemptAuthentication");
        try {
            // 사용자 요청 정보로 UserPasswordAuthenticationToken 발급
            loginDto = new ObjectMapper().readValue(request.getInputStream(), LoginDto.class);
            authRequest = new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Token 발급 실패");
        }
        setDetails(request, authRequest);

        // AuthenticationManager에게 전달 -> AuthenticationProvider의 인증 메서드 실행
        return this.getAuthenticationManager().authenticate(authRequest);
    }

}
