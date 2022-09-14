package com.ssafy.lofi.config.security;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@AllArgsConstructor
@Getter
@ToString
//회원 데이터를 조회하고 해당 정보와 권한을 저장하는 UserDetails를 구현
public class UserDetailsImpl implements UserDetails, OAuth2User {

    private final String username; //이메일
    private final String password; //비밀번호
    private final int id; //사용자 고유번호
    private final int point;
    private final String provider; //제공자
    private final Collection<? extends GrantedAuthority> authorities;

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public int getId() {
        return id;
    }

    public int getPoint() {
        return point;
    }

    public String getProvider() {
        return provider;
    }

    /*OAuth2*/
    @Override
    public Map<String, Object> getAttributes() {
        return getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    /*OAuth2*/
    @Override
    public String getName() {
        return username;
    }
}