package com.ssafy.lofi.controller;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;
import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import com.ssafy.lofi.service.MissingPersonService;
import lombok.RequiredArgsConstructor;


import org.json.simple.JSONArray;
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
}
