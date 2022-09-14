package com.ssafy.lofi.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.lofi.config.security.CustomAuthenticationFilter;
import com.ssafy.lofi.util.jwt.JwtFilter;
import com.ssafy.lofi.util.jwt.JwtProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
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
public class SecurityConfig {

    private final ObjectMapper objectMapper;
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
    private final AuthenticationManager authenticationManager;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().antMatchers(
                "/swagger-ui/**",
                "/api/login", "api/account/**"// 임시
        ).requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http.httpBasic().disable()
                .formLogin().disable()
                .cors().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/api/**").permitAll()
                //.antMatchers("/api/**").authenticated()
                .and()
                .formLogin().disable()
                .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtFilter(), UsernamePasswordAuthenticationFilter.class)
                .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
                .accessDeniedHandler(accessDeniedHandler)
                .and().build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception{
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager);
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
