package com.ssafy.lofi.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LostArticleDetailResponse {
    private String atcId;
    private String lstFilePathImg;
    private Integer lstHor;
    private String lstLctNm;
    private String lstPlace;
    private String lstPlaceSeNm;
    private String lstPrdtNm;
    private String lstSbjt;
    private String lstSteNm;
    private String lstYmd;
    private String orgId;
    private String orgNm;
    private String prdtClNm;
    private String tel;
    private String uniq;
}
