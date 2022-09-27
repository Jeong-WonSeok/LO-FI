package com.ssafy.lofi.dto.request;

import lombok.Data;

@Data
public class LostArticleRequest {
    private String name;
    private String category;
    private String date;
    private String time;
    private String location;
    private String location_description;
    private Long userId;
    private String picture;
    private String point;
    private double lat;
    private double lon;
}
