package com.ssafy.lofi.dto.response;


import lombok.*;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MissingPersonAPIResponse {
    private String nm;
    private String sexdstnDscd;
    private Integer age;
    private Integer ageNow;
    private String occrAdres;
    private String occrde;
    private String etcSpfeatr;
    private String writngTrgetDscd;
    private String alldressingDscd;
    private String tknphotoFile;
}
