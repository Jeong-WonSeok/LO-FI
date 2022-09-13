package com.ssafy.lofi.service;

import com.ssafy.lofi.dto.response.MailDto;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Random;

@RequiredArgsConstructor
@Service
public class MailService {

    private final JavaMailSender javaMailSender;

    //private fianl UserRepository userRepository;

    // 이메일 중복 확인 후 있으면 있다고 리턴 없으면 메일 인증 진행
    public String joinEmail(String email) {
        // 이메일 중복 확인
        boolean flag = true; //userRepository.existsByEmail(email);

        // 이메일이 존재하는 경우
        if(flag){
            // 인증번호 대신 이메일이 존재한다고 응답
            return "exists";
        }
        // 이메일이 존재하지 않는 경우
        else {
            int authNumber = makeRandomNumber();
            MailDto mailDto = new MailDto();
            mailDto.setEmail(email);
            mailDto.setTitle("LOFI 이메일 인증 안내 입니다.");
            mailDto.setMessage("안녕하세요. LOFI 이메일 인증번호 안내 이메일 입니다. \n 인증번호는 [ " + authNumber + " ] 입니다.");
            sendMail(mailDto);
            return Integer.toString(authNumber);
        }

    }

    public int makeRandomNumber() {
        // 난수의 범위 111111 ~ 999999 (6자리 난수)
        Random r = new Random();
        int checkNum = r.nextInt(888888) + 111111;
        System.out.println("인증번호 : " + checkNum);
        return checkNum;
    }

    public void sendMail(MailDto mailDto) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailDto.getEmail());
        message.setSubject(mailDto.getTitle());
        message.setText(mailDto.getMessage());
        //message.setFrom(applicationYamlRead.getUsername());
        message.setReplyTo(mailDto.getEmail());
        javaMailSender.send(message);
    }


}
