package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.*;
import com.ssafy.lofi.db.repository.*;
import com.ssafy.lofi.dto.request.*;
import com.ssafy.lofi.dto.UserRole;
import com.ssafy.lofi.dto.response.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@RequiredArgsConstructor
@Service
public class RegisterService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final MissingAnlmalRepository missingAnlmalRepository;
    private final MissingPersonRepository missingPersonRepository;
    private final LostArticleRepository lostArticleRepository;
    private final FoundArticleRepository foundArticleRepository;

    public User signUp(SignUpDto signUpDto) {
        User user = User.builder()
                .email(signUpDto.getEmail())
                .password(passwordEncoder.encode(signUpDto.getPassword()))
                .role(UserRole.ROLE_USER)
                .provider(signUpDto.getProvider())
                .build();
        return userRepository.save(user);
    }

    public UserDto mypage(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 유저가 없습니다. email=" + email));;
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPoint(user.getPoint());
        return userDto;
    }

    public void deleteuser(Long id) {
        userRepository.deleteById(id);
    }

    public void registerMissingAnimal(MissingAnimalRequest missingAnimalRequest, int userId) {
        MissingAnimal missingAnimal = MissingAnimal.builder()
                .name(missingAnimalRequest.getName())
                .gender(missingAnimalRequest.getGender())
                .age(missingAnimalRequest.getAge())
                .description(missingAnimalRequest.getDescription())
                .img(missingAnimalRequest.getPicture())
                .missingDay(stringDateConvertDate(missingAnimalRequest.getDate(),missingAnimalRequest.getTime()))
                .build();
        missingAnlmalRepository.save(missingAnimal);
    }

    public Date stringDateConvertDate(String date, String time){
        LocalDateTime result_date;
        if(!date.isEmpty() || !time.isEmpty()){
            String result = date + " " + time;
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            result_date = LocalDateTime.parse(result,formatter);
        }else {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            result_date = LocalDateTime.parse(date,formatter);
        }
        return java.sql.Timestamp.valueOf(result_date);
    }

    public void registerMissingPerson(MissingPersonRequest missingPersonRequest, int userId) {
        missingPersonRequest.setMissingClothes(spellCheckout(missingPersonRequest.getMissingClothes()));
        missingPersonRequest.setDescription(spellCheckout(missingPersonRequest.getDescription()));

        MissingPerson missingPerson = MissingPerson.builder()
                .name(missingPersonRequest.getName())
                .gender(missingPersonRequest.getGender())
                .age(missingPersonRequest.getMissingAge())
                .date(missingPersonRequest.getMissingDate())
                .dress(missingPersonRequest.getMissingClothes())
                .picture(missingPersonRequest.getPicture())
                .build();
        missingPersonRepository.save(missingPerson);
    }

    public String spellCheckout(String word){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j7b102.p.ssafy.io:8000/api/spellCheck/" + word;
        String result = restTemplate.getForObject(url,String.class);
        String s = result.substring(1,result.length()-1);
        return s;
    }

    public void registerLostArticle(LostArticleRequest lostArticleRequest, int i) {
        lostArticleRequest.setName(spellCheckout(lostArticleRequest.getName()));
        lostArticleRequest.setCategory(spellCheckout(lostArticleRequest.getCategory()));

        LostArticle lostArticle = LostArticle.builder()
                .name(lostArticleRequest.getName())
                .category(lostArticleRequest.getCategory())
                .date(stringDateConvertDate(lostArticleRequest.getDate(), lostArticleRequest.getTime()).toString())
                .location(lostArticleRequest.getLocation())
                .picture(lostArticleRequest.getPicture())
                .build();
        lostArticleRepository.save(lostArticle);
    }

    public void registerFoundArticle(FoundArticleRequest foundArticleRequest, int i) {
        foundArticleRequest.setName(spellCheckout(foundArticleRequest.getName()));
        foundArticleRequest.setCategory(spellCheckout(foundArticleRequest.getCategory()));
        foundArticleRequest.setDescription(spellCheckout(foundArticleRequest.getDescription()));

        FoundArticle foundArticle = FoundArticle.builder()
                .name(foundArticleRequest.getName())
                .category(foundArticleRequest.getCategory())
                .date(stringDateConvertDate(foundArticleRequest.getDate(), foundArticleRequest.getTime()).toString())
                .safeLocation(foundArticleRequest.getSafeLocation())
                .foundLocation(foundArticleRequest.getFoundLocation())
                .picture(foundArticleRequest.getPicture())
                .description(foundArticleRequest.getDescription())
                .build();
        foundArticleRepository.save(foundArticle);
    }
}
