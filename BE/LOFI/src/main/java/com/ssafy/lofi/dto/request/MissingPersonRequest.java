package com.ssafy.lofi.dto.request;

import lombok.Data;

@Data
public class MissingPersonRequest {
    private String name; // 실종자 이름
    private String gender; // 성별
    private String location; // 실종 지역
    private String picture; // 실종자 사진
    private String locationDescription; // 실종 장소 상세
    private String missingDate; // 실종 시간
    private String missingTime; // 실종 시간
    private String missingClothes; // 실종 당시 인상착의
    private Integer missingAge; // 실종 당시 나이
    private String point; // 사례금
}
