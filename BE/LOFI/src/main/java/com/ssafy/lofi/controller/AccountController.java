package com.ssafy.lofi.controller;

import com.ssafy.lofi.service.MailService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/account")
public class AccountController {

    private final MailService mailService;

    @GetMapping(value = "/emailCheck")
    public ResponseEntity<?> mailCheck(@RequestParam final String email){
        String result = mailService.joinEmail(email);

        if(result.equals("exits")){
            return ResponseEntity.status(401).body("이미 존재하는 이메일 입니다.");
        }
        else{
            return ResponseEntity.ok().body(result);
        }
        //return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
