package com.ssafy.lofi.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FoundArticleDetailResponse {
    private String atcId;
    private String csteSteNm;
    private String depPlace;
    private String fdFilePathImg;
    private String fdHor;
    private String fdPlace;
    private String fdPrdtNm;
    private String fdSn;
    private String fdYmd;
    private String fndKeepOrgnSeNm;
    private String orgId;
    private String orgNm;
    private String prdtClNm;
    private String tel;
    private String uniq;
}
