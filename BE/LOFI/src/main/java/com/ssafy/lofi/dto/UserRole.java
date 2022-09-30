package com.ssafy.lofi.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum UserRole {

    ROLE_GUEST("ROLE_GUEST"),
    ROLE_USER("ROLE_USER");
    private final String value;
}
