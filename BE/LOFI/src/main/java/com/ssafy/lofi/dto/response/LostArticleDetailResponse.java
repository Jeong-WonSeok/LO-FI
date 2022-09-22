package com.ssafy.lofi.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LostArticleDetailResponse {
    String atcId;
    String lstFilePathImg;
    Integer lstHor;
    String lstLctNm;
    String lstPlace;
    String lstPlaceSeNm;
    String lstPrdtNm;
    String lstSbjt;
    String lstSteNm;
    String lstYmd;
    String orgId;
    String orgNm;
    String prdtClNm;
    String tel;
    String uniq;
}
