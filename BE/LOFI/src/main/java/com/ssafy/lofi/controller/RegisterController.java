package com.ssafy.lofi.controller;

import com.ssafy.lofi.dto.request.SignUpDto;
import com.ssafy.lofi.service.RegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/register")
public class RegisterController {

    private final RegisterService registerService;

    @PostMapping(value = "/signUp")
    public ResponseEntity<?> signup(@RequestBody SignUpDto signUpDto){
        registerService.signUp(signUpDto);
        return ResponseEntity.ok().build();
    }
}
