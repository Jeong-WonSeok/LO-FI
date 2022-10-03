package com.ssafy.lofi.dto.response;

import com.ssafy.lofi.db.entity.FoundArticle;
import lombok.Data;

import java.util.Date;

@Data
public class FoundArticleDto {

    private Long id;
    private Long userId;
    private String name;
    private String category;
    private String safeLocation; // 보관 장소
    private String foundLocation; // 발견 장소
    private Date date; // 잃어버린 날짜
    private String description; // 설명
    private String picture; // 이미지
    // 위도 경도 좌표
    private double lat; // 발견 장소 좌표
    private double lon; // 발견 장소 좌표
    private String time;

    public FoundArticleDto(FoundArticle foundArticle){
        this.id = foundArticle.getId();
        this.name = foundArticle.getName();
        this.category = foundArticle.getCategory();
        this.safeLocation = foundArticle.getSafeLocation();
        this.foundLocation = foundArticle.getFoundLocation();
        this.date = foundArticle.getDate();
        this.description = foundArticle.getDescription();
        this.picture = foundArticle.getPicture();
        this.lat = foundArticle.getLatitude();
        this.lon = foundArticle.getLongitude();
        this.time = foundArticle.getTime() == null ? "00:00:00" : foundArticle.getTime().toString();
    }
}
