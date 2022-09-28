package com.ssafy.lofi.controller;

import com.ssafy.lofi.dto.response.FoundArticleDto;
import com.ssafy.lofi.dto.response.LostArticleDto;
import com.ssafy.lofi.dto.response.MissingAnimalDto;
import com.ssafy.lofi.dto.response.MissingPersonDto;
import com.ssafy.lofi.service.DetailService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping(value = "/api/detail")
public class DetailController {
    private final DetailService detailService;

    @ApiOperation(value = "실종동물 조회", notes = "실종 동물 조회")
    @GetMapping
    public ResponseEntity<?> getMissingAnimal(@RequestParam Long Id,@RequestParam String category){
        if(category.equals("animal")){
            MissingAnimalDto missingAnimalDto = detailService.selectAnimalByid(Id);
            return ResponseEntity.ok().body(missingAnimalDto);
        }
        else if(category.equals("article")){
            LostArticleDto lostArticleDto = detailService.selectArticleByid(Id);
            return ResponseEntity.ok().body(lostArticleDto);
        }
        else if(category.equals("found")){
            FoundArticleDto foundArticleDto = detailService.selectFoundArticle(Id);
            return ResponseEntity.ok().body(foundArticleDto);
        }
        else if(category.equals("person")){
            MissingPersonDto missingPersonDto = detailService.selectPersonByid(Id);
            return ResponseEntity.ok().body(missingPersonDto);
        }
        else{
            return ResponseEntity.badRequest().build();
        }
    }
}
