package com.ssafy.lofi.controller;

import com.ssafy.lofi.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.xml.ws.Response;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/search")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/keyword")
    public ResponseEntity searchKeyword(@RequestParam String category, @RequestParam String keyword){
        // 파이썬 api 호출
        String[] keywords = searchService.keywordtoPython(keyword);
        if(category.equals("animal")){
            searchService.getAnimal(keywords,category);
        }
        else if(category.equals("article")){
            searchService.getArticle(keywords,category);
        }
        else if(category.equals("found")){
            searchService.getFound(keywords,category);
        }
        else if(category.equals("person")){
            searchService.getPerson(keywords,category);
        }
        else{
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.badRequest().build();
    }
}
