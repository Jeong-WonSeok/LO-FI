package com.ssafy.lofi.controller;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.ssafy.lofi.dto.response.LostArticleDetailResponse;
import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import com.ssafy.lofi.service.LostArticleService;
import com.ssafy.lofi.service.MissingPersonService;
import lombok.RequiredArgsConstructor;


import org.json.JSONArray;
import org.json.XML;
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
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("api/main")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MainController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MissingPersonService missingPersonService;
    private final LostArticleService lostArticleService;
    @Transactional
    @GetMapping("/person")
    public void getLostPerson(
            @RequestParam("esntlId") int esntlId,
            @RequestParam("authKey") String authKey,
            @RequestParam("rowSize") int rowSize
    ) throws ParseException {

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
    public void getLostArticle() throws IOException {
        int numOfRows = 100;
        int pageNo = 1;

        // 분실물 리스트 조회 API
        List<String> idList = new ArrayList<>();
        boolean flag = true;
        while (flag){
            flag = lostArticleService.getLostArticleList(numOfRows, pageNo++, idList);
        }

        // idList 돌면서 이미 있는지 체크
        lostArticleService.checkIdExist(idList);

        // idList 돌면서 분실물 상세조회 API 호출하고 db에 저장하기
        lostArticleService.callDetailAPIAndSaveLostArticle(idList);
    }
}
