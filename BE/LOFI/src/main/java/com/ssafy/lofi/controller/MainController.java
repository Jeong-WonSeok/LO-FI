package com.ssafy.lofi.controller;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import com.ssafy.lofi.service.FoundArticleService;
import com.ssafy.lofi.service.LostArticleService;
import com.ssafy.lofi.service.MissingPersonService;
import com.ssafy.lofi.service.PoliceService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;



import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

import java.util.*;


@RestController
@RequestMapping("api/main")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MainController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MissingPersonService missingPersonService;
    private final LostArticleService lostArticleService;
    private final FoundArticleService foundArticleService;
    private final PoliceService policeService;
    @Transactional
    @GetMapping("/person")
    public void getLostPerson(
            @RequestParam("esntlId") int esntlId,
            @RequestParam("authKey") String authKey,
            @RequestParam("rowSize") int rowSize
    ) throws ParseException, java.text.ParseException {

        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("esntlId", esntlId);
        params.add("authKey", authKey);
        params.add("rowSize", rowSize);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<MultiValueMap<String, Object>> entity = new HttpEntity<>(params, headers);

        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://www.safe182.go.kr/api/lcm/findChildList.do",
                HttpMethod.POST,
                entity,
                String.class
                );
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObject = (JSONObject) jsonParser.parse(response.getBody());
        Long totalCount = (Long) jsonObject.get("totalCount");
        Long pageNo = (totalCount / rowSize) + 1;

        List<MissingPersonAPIResponse> apiResponses = new ArrayList<>();
        ObjectMapper mapper = new ObjectMapper();
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        for (int i = 1; i <= pageNo; i++){
            params.set("page", i);
            response = rt.exchange(
                    "https://www.safe182.go.kr/api/lcm/findChildList.do",
                    HttpMethod.POST,
                    entity,
                    String.class
            );
            jsonObject = (JSONObject) jsonParser.parse(response.getBody());
            apiResponses.addAll(mapper.convertValue(jsonObject.get("list"), TypeFactory.defaultInstance().constructCollectionType(List.class, MissingPersonAPIResponse.class)));
        }

        // apiResponse 에 실종자 데이터 리스트로 받아옴
        // 이제 db에 넣어줘야한다.
        missingPersonService.saveMissingPersonAPIData(apiResponses);
    }

    @Transactional
    @DeleteMapping("/person")
    public void deleteMissingPerson(){
        missingPersonService.deleteMissingPersonAPIData();
    }

    @Transactional
    @GetMapping("/article")
    public void getLostArticle(String startDate, String endDate) throws IOException, java.text.ParseException {
        int numOfRows = 1000;
        int pageNo = 1;

        // 분실물 리스트 조회 API
        List<String> idList = new ArrayList<>();
        Map<String, Integer> idMap = new HashMap<>();
        boolean flag = true;
        while (flag){
            flag = lostArticleService.getLostArticleList(numOfRows, pageNo++, idMap, startDate, endDate);
        }

        // idList 돌면서 이미 있는지 체크
        List<String> insertList = new ArrayList<>();
        List<String> deleteList = new ArrayList<>();
        lostArticleService.checkIdExist(idMap, insertList, deleteList);

        // insertList 돌면서 분실물 상세조회 API 호출하고 db에 저장하기
        lostArticleService.callDetailAPIAndSaveLostArticle(insertList);

        // deleteList 돌면서 db에서 deleted update해주기
        lostArticleService.deleteLostArticle(deleteList);
    }

    @Transactional
    @GetMapping("/found")
    public void getFoundArticle(String startDate, String endDate) throws IOException, java.text.ParseException {
        int numOfRows = 1000;
        int pageNo = 1;

        // 습득물 리스트 조회 API
        List<String> idList = new ArrayList<>();
        Map<String, Integer> idMap = new HashMap<>();
        boolean flag = true;
        while (flag) {
            flag = foundArticleService.getFoundArticleList(numOfRows, pageNo++, idMap, startDate, endDate);
        }

        // idList 돌면서 이미 있는지 체크
        List<String> insertList = new ArrayList<>();
        List<String> deleteList = new ArrayList<>();
        foundArticleService.checkIdExist(idMap, insertList, deleteList);

        // idList 돌면서 습득물 상세조회 API 호출하고 db에 저장하기
        foundArticleService.callDetailAPIAndSaveFoundArticle(insertList);

        // deleteList 돌면서 db에서 deleted update해주기
        foundArticleService.deleteFoundArticle(deleteList);
    }

    @ApiOperation(value = "경찰서 주소 업데이트 사용 금지", notes = "무분별하게 실행 하지 말 것")
    @GetMapping("/police")
    public void updatePoliceAddress(){
        policeService.updateAddress();
    }
}
