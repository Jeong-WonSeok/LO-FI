package com.ssafy.lofi.util.handler;

import com.common.dipping.common.ApiResponse;
import com.common.dipping.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@RequiredArgsConstructor
public class AuthenticationSuccessHandlerImpl extends SimpleUrlAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        System.out.println("AuthenticationSuccessHandlerImpl-onAuthenticationSuccess: authentication="+authentication.toString());
        // 전달받은 인증정보 SecurityContextHolder에 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);
        // JWT Token 발급
        final String token = jwtProvider.generateJwtToken(authentication);
        // Response
        if(authentication instanceof OAuth2AuthenticationToken){
            String url = makeRedirectUrl(token);
            getRedirectStrategy().sendRedirect(request, response, url);
        } else{
            ApiResponse.token(response, token);
        }

    }

    private String makeRedirectUrl(String token) {
        return UriComponentsBuilder.fromUriString("http://i7b210.p.ssafy.io/oauth2/redirect?token="+token)
                .build().toUriString();
    }

}
