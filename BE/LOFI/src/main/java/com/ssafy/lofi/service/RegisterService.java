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

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
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
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("해당 이메일을 가진 유저가 없습니다. email=" + email));
        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPoint(user.getPoint());
        return userDto;
    }

    public void deleteuser(Long id) {
        userRepository.deleteById(id);
    }

    public Long registerMissingAnimal(MissingAnimalRequest missingAnimalRequest, Long userId) {
        MissingAnimal missingAnimal = MissingAnimal.builder()
                .name(missingAnimalRequest.getName())
                .kind(missingAnimalRequest.getBreed())
                .gender(missingAnimalRequest.getGender())
                .age(missingAnimalRequest.getAge())
                .description(missingAnimalRequest.getDescription())
                .img(missingAnimalRequest.getPicture())
                .location(missingAnimalRequest.getLocation())
                .missingDay(stringDateConvertDate(missingAnimalRequest.getDate()))
                .latitude(missingAnimalRequest.getLat())
                .longitude(missingAnimalRequest.getLat())
                .time(stringConvertTime(missingAnimalRequest.getTime()))
                .userId(userId)
                .build();
        missingAnlmalRepository.save(missingAnimal);
        return missingAnimal.getId();
    }

    public Date stringDateConvertDate(String date){
        LocalDate result_date;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        result_date = LocalDate.parse(date,formatter);
        return java.sql.Date.valueOf(result_date);
    }

    public Time stringConvertTime(String time){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        if(time == null){
            return java.sql.Time.valueOf("00:00:00");
        }

        LocalTime result = LocalTime.parse(time,formatter);
        return java.sql.Time.valueOf(result);
    }

    public Long registerMissingPerson(MissingPersonRequest missingPersonRequest, Long userId) {
        missingPersonRequest.setMissingClothes(spellCheckout(missingPersonRequest.getMissingClothes()));
        missingPersonRequest.setDescription(spellCheckout(missingPersonRequest.getDescription()));

        MissingPerson missingPerson = MissingPerson.builder()
                .name(missingPersonRequest.getName())
                .gender(missingPersonRequest.getGender())
                .age(missingPersonRequest.getMissingAge())
                .ageNow(missingPersonRequest.getAgeNow())
                .date(stringDateConvertDate(missingPersonRequest.getMissingDate()))
                .dress(missingPersonRequest.getMissingClothes())
                .picture(missingPersonRequest.getPicture())
                .location(missingPersonRequest.getLocation())
                .latitude(missingPersonRequest.getLat())
                .longitude(missingPersonRequest.getLon())
                .time(stringConvertTime(missingPersonRequest.getMissingTime()))
                .userId(userId)
                .build();
        missingPersonRepository.save(missingPerson);
        return missingPerson.getId();
    }

    public String spellCheckout(String word){
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j7b102.p.ssafy.io:8000/api/spellCheck/" + word;
        String result = restTemplate.getForObject(url,String.class);
        String s = result.substring(1,result.length()-1);
        return s;
    }

    public Long registerLostArticle(LostArticleRequest lostArticleRequest, Long userId) {
        lostArticleRequest.setName(spellCheckout(lostArticleRequest.getName()));
        lostArticleRequest.setCategory(spellCheckout(lostArticleRequest.getCategory()));

        LostArticle lostArticle = LostArticle.builder()
                .name(lostArticleRequest.getName())
                .category(lostArticleRequest.getCategory())
                .date(stringDateConvertDate(lostArticleRequest.getDate()))
                .location(lostArticleRequest.getLocation())
                .picture(lostArticleRequest.getPicture())
                .description(lostArticleRequest.getDescription())
                .latitude(lostArticleRequest.getLat())
                .longitude(lostArticleRequest.getLon())
                .time(stringConvertTime(lostArticleRequest.getTime()))
                .userId(userId)
                .build();
        lostArticleRepository.save(lostArticle);
        return lostArticle.getId();
    }

    public Long registerFoundArticle(FoundArticleRequest foundArticleRequest, Long userId) {
        foundArticleRequest.setName(spellCheckout(foundArticleRequest.getName()));
        foundArticleRequest.setCategory(spellCheckout(foundArticleRequest.getCategory()));
        foundArticleRequest.setDescription(spellCheckout(foundArticleRequest.getDescription()));

        FoundArticle foundArticle = FoundArticle.builder()
                .name(foundArticleRequest.getName())
                .category(foundArticleRequest.getCategory())
                .date(stringDateConvertDate(foundArticleRequest.getDate()))
                .safeLocation(foundArticleRequest.getSafeLocation())
                .foundLocation(foundArticleRequest.getFoundLocation())
                .picture(foundArticleRequest.getPicture())
                .description(foundArticleRequest.getDescription())
                .latitude(foundArticleRequest.getLat())
                .longitude(foundArticleRequest.getLon())
                .time(stringConvertTime(foundArticleRequest.getTime()))
                .userId(userId)
                .build();
        foundArticleRepository.save(foundArticle);
        return foundArticle.getId();
    }
}
