package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.LostArticleDetailResponse;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class LostArticle extends BaseEntity{
    private String atcId;
    private String name;
    private String category;
    private String date;
    private String police;
    private String location;
    private String city;
    private Long userId;
    private String picture;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "boolean default false")
    private String deleted;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updateDate;

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
                .description(detailResponse.getUniq())
                .build();
    }
}
