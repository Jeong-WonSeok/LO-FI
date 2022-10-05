package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.*;
import com.ssafy.lofi.db.repository.*;
import com.ssafy.lofi.dto.response.FoundArticleDto;
import com.ssafy.lofi.dto.response.LostArticleDto;
import com.ssafy.lofi.dto.response.MissingAnimalDto;
import com.ssafy.lofi.dto.response.MissingPersonDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class DetailService {
    private final MissingAnlmalRepository missingAnlmalRepository;
    private final MissingPersonRepository missingPersonRepository;
    private final LostArticleRepository lostArticleRepository;
    private final FoundArticleRepository foundArticleRepository;
    private final UserRepository userRepository;

    public MissingAnimalDto selectAnimalByid(Long id) {
        MissingAnimal missingAnimal = missingAnlmalRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + id));
        MissingAnimalDto missingAnimalDto = new MissingAnimalDto(missingAnimal);

        if(missingAnimal.getUserId() != null){
            User user = userRepository.findById(missingAnimal.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + missingAnimal.getUserId()));
            missingAnimalDto.setEmail(user.getEmail());
        }

        return  missingAnimalDto;
    }

    public LostArticleDto selectArticleByid(Long id) {
        LostArticle lostArticle = lostArticleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 분실물이 존재 하지 않습니다." + id));
        LostArticleDto lostArticleDto = new LostArticleDto(lostArticle);

        if(lostArticle.getUserId() != null){
            User user = userRepository.findById(lostArticle.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + lostArticle.getUserId()));
            lostArticleDto.setEmail(user.getEmail());
        }

        return lostArticleDto;
    }

    public FoundArticleDto selectFoundArticle(Long id) {
        FoundArticle foundArticle = foundArticleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 습득물이 존재 하지 않습니다." + id));
        FoundArticleDto foundArticleDto = new FoundArticleDto(foundArticle);

        if(foundArticle.getUserId() != null){
            User user = userRepository.findById(foundArticle.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + foundArticle.getUserId()));
            foundArticleDto.setEmail(user.getEmail());
        }

        return foundArticleDto;
    }

    public MissingPersonDto selectPersonByid(Long id) {
        MissingPerson missingPerson = missingPersonRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 실종자가 존재 하지 않습니다." + id));
        MissingPersonDto missingPersonDto = new MissingPersonDto(missingPerson);

        if(missingPerson.getUserId() != null){
            User user = userRepository.findById(missingPerson.getUserId()).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + missingPerson.getUserId()));
            missingPersonDto.setEmail(user.getEmail());
        }

        return missingPersonDto;
    }
}
