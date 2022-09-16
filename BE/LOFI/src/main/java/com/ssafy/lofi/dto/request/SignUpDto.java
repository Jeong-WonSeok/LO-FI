package com.ssafy.lofi.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDto {

    private String email;
    private String password;
    private String provider;

}