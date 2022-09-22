package com.ssafy.lofi.dto.response;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissingAnimalAPIResponse {
    private String resName;
    private String resGender;
    private String resFind;
    private String resAge;
    private Date resMissingDay;
    private String resLocation;
    private String resDescription;
    private String resImg;
    private Boolean resUsed;

}
