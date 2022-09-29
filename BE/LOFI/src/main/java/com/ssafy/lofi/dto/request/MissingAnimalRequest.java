package com.ssafy.lofi.dto.request;

import lombok.Data;

@Data
public class MissingAnimalRequest {
    private String name; // 실종 동물 이름
    private String gender; // 실종 동물 성별
    private String age; // 실종 동물 추정 나이
    private String location; // 실종 지역
    private String locationDescription; // 실종 동물 지역 상세
    private String picture; // 실종 동물 사진
    private String date; // 실종 일자
    private String time; // 실종 시간
    private String description; // 실종 동물 특징
    private int point; // 사례금
    private String breed; // 품종
    private double lat;
    private double lon;
}
