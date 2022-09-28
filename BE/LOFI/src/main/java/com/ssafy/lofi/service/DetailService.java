package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.FoundArticle;
import com.ssafy.lofi.db.entity.LostArticle;
import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.entity.MissingPerson;
import com.ssafy.lofi.db.repository.FoundArticleRepository;
import com.ssafy.lofi.db.repository.LostArticleRepository;
import com.ssafy.lofi.db.repository.MissingAnlmalRepository;
import com.ssafy.lofi.db.repository.MissingPersonRepository;
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

    public MissingAnimalDto selectAnimalByid(Long id) {
        MissingAnimal missingAnimal = missingAnlmalRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 동물이 존재 하지 않습니다." + id));
        MissingAnimalDto missingAnimalDto = new MissingAnimalDto(missingAnimal);
        return  missingAnimalDto;
    }

    public LostArticleDto selectArticleByid(Long id) {
        LostArticle lostArticle = lostArticleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 분실물이 존재 하지 않습니다." + id));
        LostArticleDto lostArticleDto = new LostArticleDto(lostArticle);
        return lostArticleDto;
    }

    public FoundArticleDto selectFoundArticle(Long id) {
        FoundArticle foundArticle = foundArticleRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 습득물이 존재 하지 않습니다." + id));
        FoundArticleDto foundArticleDto = new FoundArticleDto(foundArticle);
        return foundArticleDto;
    }

    public MissingPersonDto selectPersonByid(Long id) {
        MissingPerson missingPerson = missingPersonRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 아이디를 가진 실종자가 존재 하지 않습니다." + id));
        MissingPersonDto missingPersonDto = new MissingPersonDto(missingPerson);
        return missingPersonDto;
    }
}
