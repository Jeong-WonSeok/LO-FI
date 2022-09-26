package com.ssafy.lofi.config.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Log4j2
@Component
//AuthenticationManager 하위에 실제로 인증을 처리할 AuthenticationProvider를 구현
public class AuthenticationProviderImpl  implements AuthenticationProvider {

    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;



    //인증 구현
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        System.out.println("AuthenticationProviderImpl-authenticate: authentication="+ authentication.toString());
        // 전달 받은 UsernamePasswordAuthenticationToken
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;

        // AuthenticaionFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 추출
        String username = token.getName();
        String password = (String) token.getCredentials();
        System.out.println("AuthenticationManager-authenticate-username: "+username);
        System.out.println("AuthenticationManager-authenticate-password: "+password);

        // 해당 회원 Database 조회
        UserDetailsImpl userDetail = (UserDetailsImpl) userDetailsService.loadUserByUsername(username);

        // 비밀번호 확인
        if (!passwordEncoder.matches(password, userDetail.getPassword())){
            throw new BadCredentialsException(userDetail.getUsername() + "Invalid password");
        }

        // 인증 성공 시 UsernamePasswordAuthenticationToken 반환
        return new UsernamePasswordAuthenticationToken(userDetail.getUsername(), "", userDetail.getAuthorities());
    }

    //provider의 동작여부를 설정
    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}