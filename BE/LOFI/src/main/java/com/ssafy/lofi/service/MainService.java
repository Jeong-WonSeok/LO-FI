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

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class MainService {
    private final FoundArticleRepository foundArticleRepository;
    private final LostArticleRepository lostArticleRepository;
    private final MissingPersonRepository missingPersonRepository;
    private final MissingAnlmalRepository missingAnlmalRepository;

    public List<MissingAnimalDto> selectAnimalsBylatlon(double lat, double lon) {
        List<MissingAnimal> missingAnimals = missingAnlmalRepository.findAllByLatLon(lat,lon);

        List<MissingAnimalDto> missingAnimalDtos = new ArrayList<>();
        for (MissingAnimal missingAnimal: missingAnimals) {
            MissingAnimalDto missingAnimalDto = new MissingAnimalDto(missingAnimal);
            missingAnimalDtos.add(missingAnimalDto);
        }
        return  missingAnimalDtos;
    }

    public List<LostArticleDto> selectArticlesBylatlon(double lat, double lon) {
        List<LostArticle> lostArticles = lostArticleRepository.findAllByLatLon(lat,lon);
        List<LostArticleDto> lostArticleDtos = new ArrayList<>();

        for (LostArticle lostArticle: lostArticles) {
            LostArticleDto lostArticleDto = new LostArticleDto(lostArticle);
            lostArticleDtos.add(lostArticleDto);
        }

        return lostArticleDtos;
    }

    public List<FoundArticleDto> selectFoundsArticleBylatlon(double lat, double lon) {
        List<FoundArticle> foundArticles = foundArticleRepository.findAllByLatLon(lat,lon);

        List<FoundArticleDto> foundArticleDtos = new ArrayList<>();
        for (FoundArticle foundArticle: foundArticles) {
            FoundArticleDto foundArticleDto = new FoundArticleDto(foundArticle);
            foundArticleDtos.add(foundArticleDto);
        }

        return foundArticleDtos;
    }

    public List<MissingPersonDto> selectPersonsBylatlon(double lat, double lon) {
        List<MissingPerson> missingPersons = missingPersonRepository.findAllByLatLon(lat,lon);
        List<MissingPersonDto> missingPersonDtos = new ArrayList<>();
        for (MissingPerson missingPerson: missingPersons) {
            MissingPersonDto missingPersonDto = new MissingPersonDto(missingPerson);
            missingPersonDtos.add(missingPersonDto);
        }

        return missingPersonDtos;
    }
}
