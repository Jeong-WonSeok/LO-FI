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
    private String lostArticleId;
    private String lostArticleName;
    private String lostArticleCategory;
    private String lostArticleDate;
    private String lostArticlePolice;
    private String lostArticleLocation;
    private String lostArticleCity;
    @Nullable
    private Long userId;
    private String lostArticlePicture;

    public static LostArticle of(LostArticleDetailResponse detailResponse) {
        return LostArticle.builder()
                .lostArticleId(detailResponse.getAtcId())
                .lostArticleName(detailResponse.getLstPrdtNm())
                .lostArticleCategory(detailResponse.getPrdtClNm())
                .lostArticleDate(detailResponse.getLstYmd())
                .lostArticlePolice(detailResponse.getOrgNm())
                .lostArticleLocation(detailResponse.getLstPlace())
                .lostArticleCity(detailResponse.getLstLctNm())
                .lostArticlePicture(detailResponse.getLstFilePathImg())
                .build();
    }
}
