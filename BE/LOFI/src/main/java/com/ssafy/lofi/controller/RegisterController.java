package com.ssafy.lofi.controller;

import com.ssafy.lofi.db.entity.User;
import com.ssafy.lofi.dto.request.SignUpDto;
import com.ssafy.lofi.dto.response.UserDto;
import com.ssafy.lofi.service.RegisterService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/register")
public class RegisterController {

    private final RegisterService registerService;

    @PostMapping(value = "/signUp")
    public ResponseEntity<?> signup(@RequestBody SignUpDto signUpDto){
        User user = registerService.signUp(signUpDto);
        if(user.getId() == null){
            return ResponseEntity.badRequest().build();
        }else {
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping(value = "/myPage")
    public ResponseEntity<?> myPage(){
        UserDto user = registerService.mypage("ssafy@naver.com");
        return ResponseEntity.ok().body(user);
    }
    //@AuthenticationPrincipal UserDetailsImpl userInfo

    @PostMapping(value = "/delete")
    public ResponseEntity<?> deleteUser(){
        registerService.deleteuser(1L);
        return ResponseEntity.ok().build();
    }
    //@AuthenticationPrincipal UserDetailsImpl userInfo
}
