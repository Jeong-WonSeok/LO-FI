package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.LostArticleDetailResponse;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LostArticle extends BaseEntity{
    private String atcId;
    private String name;
    private String category;
    private String date;
    private String police;
    private String location;
    private String city;
    @Nullable
    private Long userId;
    private String picture;

    public static LostArticle of(LostArticleDetailResponse detailResponse) {
        return LostArticle.builder()
                .atcId(detailResponse.getAtcId())
                .name(detailResponse.getLstPrdtNm())
                .category(detailResponse.getPrdtClNm())
                .date(detailResponse.getLstYmd())
                .police(detailResponse.getOrgNm())
                .location(detailResponse.getLstPlace())
                .city(detailResponse.getLstLctNm())
                .picture(detailResponse.getLstFilePathImg())
                .build();
    }
}
