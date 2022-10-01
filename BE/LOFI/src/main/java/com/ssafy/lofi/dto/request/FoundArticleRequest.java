package com.ssafy.lofi.dto.request;

import lombok.Data;

@Data
public class FoundArticleRequest {
    private String name;
    private String category;
    private String date;
    private String time;
    private String safeLocation;
    private String foundLocation;
    private Long userId;
    private String picture;
    private int point;
    private String description;
    private double lat;
    private double lon;
}
