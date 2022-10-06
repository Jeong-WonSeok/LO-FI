package com.ssafy.lofi.service;

import com.ssafy.lofi.db.entity.FoundArticle;
import com.ssafy.lofi.db.entity.LostArticle;
import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.repository.*;
import com.ssafy.lofi.dto.response.FoundArticleDto;
import com.ssafy.lofi.dto.response.LostArticleDto;
import com.ssafy.lofi.dto.response.MissingAnimalDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchService {

    private final FoundArticleRepository foundArticleRepository;
    private final LostArticleRepository lostArticleRepository;
    private final MissingAnlmalRepository missingAnlmalRepository;
    private final MissingPersonRepository missingPersonRepository;
    private final KeywordRepository keywordRepository;

    public String[] keywordtoPython(String keyword) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://j7b102.p.ssafy.io:8000/api/keyword/" + keyword;
        String s = restTemplate.getForObject(url,String.class);
        String result = s.substring(1,s.length()-1);
        return result.split(" ");
    }

    public List<MissingAnimalDto> getAnimal(String[] keywords, String category) {
        List<MissingAnimal> missingAnimals = new ArrayList<>();
        if(keywords.length == 2){
            missingAnimals = missingAnlmalRepository.findBykeywordtwoAnimal(keywords[0],keywords[1]);
        }else if(keywords.length == 3){
            missingAnimals = missingAnlmalRepository.findBykeywordthreeAnimal(keywords[0],keywords[1],keywords[2]);
        }else {
            missingAnimals = missingAnlmalRepository.findBykeywordoneAnimal(keywords[0]);
        }

        List<MissingAnimalDto> missingAnimalDtos = new ArrayList<>();
        for (MissingAnimal missingAnimal: missingAnimals) {
            MissingAnimalDto missingAnimalDto = new MissingAnimalDto(missingAnimal);
            missingAnimalDtos.add(missingAnimalDto);
        }
        return missingAnimalDtos;
    }

    public void getPerson(String[] keywords, String category) {
        //set<MissingPerson> missingPersons = missingPersonRepository;
        //List<MissingPersonDto> missingPersonDtos = new ArrayList<>();
//        for (MissingPerson missingPerson : missingPersons) {
//            MissingPersonDto missingPersonDto = new MissingPersonDto(missingPerson);
//            missingPersonDtos.add(missingPersonDto);
//        }
    }

    public List<FoundArticleDto> getFound(String[] keywords, String category) {
        List<FoundArticle> foundArticles = new ArrayList<>();

        if(keywords.length == 2){
            foundArticles = foundArticleRepository.findBykeywordtwoFound(keywords[0],keywords[1]);
        }else if(keywords.length == 3){
            foundArticles = foundArticleRepository.findBykeywordthreeFound(keywords[0],keywords[1],keywords[2]);
        }else {
            foundArticles = foundArticleRepository.findBykeywordoneFound(keywords[0]);
        }

        List<FoundArticleDto> foundArticleDtos = new ArrayList<>();
        for (FoundArticle foundArticle: foundArticles) {
            FoundArticleDto foundArticleDto = new FoundArticleDto(foundArticle);
            foundArticleDtos.add(foundArticleDto);
        }

        return foundArticleDtos;
    }

    public List<LostArticleDto> getArticle(String[] keywords, String category) {
        List<LostArticle> lostArticles = new ArrayList<>();

        if(keywords.length == 2){
            lostArticles = lostArticleRepository.findBykeywordtwoArticle(keywords[0],keywords[1]);
        }else if(keywords.length == 3){
            lostArticles = lostArticleRepository.findBykeywordthreeArticle(keywords[0],keywords[1],keywords[2]);
        }else {
            lostArticles = lostArticleRepository.findBykeywordoneArticle(keywords[0]);
        }
        List<LostArticleDto> lostArticleDtos = new ArrayList<>();

        for (LostArticle lostArticle: lostArticles) {
            LostArticleDto lostArticleDto = new LostArticleDto(lostArticle);
            lostArticleDtos.add(lostArticleDto);
        }

        return lostArticleDtos;
    }

}
