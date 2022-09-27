package com.ssafy.lofi.dto.response;

import com.ssafy.lofi.db.entity.LostArticle;
import lombok.Data;

@Data
public class LostArticleDto {

    private Long id;
    private String atcId;
    private Long userId;
    private String name;
    private String category;
    private String location; // 잃어버린 장소
    private String police; // 신고된 경찰소
    private String date; // 잃어버린 날짜
    private String picture; // 이미지
    // 위도 경도 좌표
    private String lat; // 잃어버린 장소 좌표
    private String lon; // 잃어버린 장소 좌표

    public LostArticleDto(LostArticle lostArticle){
        this.id = lostArticle.getId();
        this.atcId = lostArticle.getAtcId();
        this.name = lostArticle.getName();
        this.category = lostArticle.getCategory();
        this.location = lostArticle.getLocation();
        this.date = lostArticle.getDate();
        this.police = lostArticle.getPolice();
        //this.picture = missingAnimal.getPicture();
    }
}
