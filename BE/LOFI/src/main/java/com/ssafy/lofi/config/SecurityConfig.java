package com.ssafy.lofi.config;

import com.ssafy.lofi.config.security.CustomAuthenticationFilter;
import com.ssafy.lofi.config.security.oauth.OAuth2UserServiceImpl;
import com.ssafy.lofi.util.jwt.JwtFilter;
import com.ssafy.lofi.util.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@RequiredArgsConstructor
@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    //private final ObjectMapper objectMapper;
    //JWT 제공 클래스
    private final JwtProvider jwtProvider;
    //인증 실패 또는 인증 헤더를 전달받지 못했을 때 핸들러
    private final AuthenticationEntryPoint authenticationEntryPoint;
    //인증 성공 핸들러
    private final AuthenticationSuccessHandler authenticationSuccessHandler;
    //인증 실패 핸들러
    private final AuthenticationFailureHandler authenticationFailureHandler;
    //인가 실패 핸들러
    private final AccessDeniedHandler accessDeniedHandler;
    private final OAuth2UserServiceImpl OAuth2UserServiceImpl;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .authorizeRequests()
                .antMatchers("/api/account/**","/api/register/**").permitAll() //로그인 및 회원가입 요청은 허용
                //.antMatchers("/api/**").authenticated()
                .and()
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                .and()
                .oauth2Login()
                .defaultSuccessUrl("http://localhost:3000")
                .successHandler(authenticationSuccessHandler)
                .userInfoEndpoint()
                .userService(OAuth2UserServiceImpl);
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception{
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/api/account/login"); // 필터 URL 설정
        customAuthenticationFilter.setAuthenticationSuccessHandler(authenticationSuccessHandler); // 인증 성공 핸들러
        customAuthenticationFilter.setAuthenticationFailureHandler(authenticationFailureHandler); // 인증 실패 핸들러
        customAuthenticationFilter.afterPropertiesSet(); // BeanFactory에 의해 모든 property가 설정되고 난 뒤 실행
        return customAuthenticationFilter;
    }

    //JWT의 인증 및 권한을 확인하는 필터
    @Bean
    public JwtFilter jwtFilter() {
        return new JwtFilter(jwtProvider);
    }
}
