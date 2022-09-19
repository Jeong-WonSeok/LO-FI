package com.ssafy.lofi.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PersonRequestDTO {
    Long estnlId;
    String authKey;
    int rowSize;
}
