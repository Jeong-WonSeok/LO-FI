package com.ssafy.lofi.dto.response;

import lombok.Data;

@Data
public class KeywordAPIResponse {

    private String resKeyword;
    private Long resFoundIndexId;
    private Long resLostIndexId;
    private Long resAnimalIndexId;
    private Long resPersonIndexId;

}
