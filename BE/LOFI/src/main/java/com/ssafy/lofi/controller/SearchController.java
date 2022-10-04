package com.ssafy.lofi.controller;

import com.ssafy.lofi.dto.response.FoundArticleDto;
import com.ssafy.lofi.dto.response.LostArticleDto;
import com.ssafy.lofi.dto.response.MissingAnimalDto;
import com.ssafy.lofi.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/keyword")
    public ResponseEntity searchKeyword(@RequestParam String category, @RequestParam String keyword){

        Map<String,Object> result = new HashMap<>();
        // 파이썬 api 호출
        String[] keywords = searchService.keywordtoPython(keyword);
        if(category.equals("animal")){
            List<MissingAnimalDto> missingAnimalDtos = searchService.getAnimal(keywords,category);
            result.put(category,missingAnimalDtos);
        }
        else if(category.equals("article")){
            List<LostArticleDto> lostArticleDtos = searchService.getArticle(keywords,category);
            result.put(category,lostArticleDtos);
        }
        else if(category.equals("found")){
            List<FoundArticleDto> foundArticleDtos = searchService.getFound(keywords,category);
            result.put(category,foundArticleDtos);
        }
//        else if(category.equals("person")){
//            searchService.getPerson(keywords,category);
//        }
        else{
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
