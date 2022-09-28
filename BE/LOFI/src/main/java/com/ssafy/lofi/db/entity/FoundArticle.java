package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.FoundArticleDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FoundArticle extends BaseEntity{
    private String name;
    @Nullable
    private Long userId;
    private String date;
    private String safeLocation;
    private String foundLocation;
    private String picture;
    private String category;
    private String atcId;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "boolean default false")
    private String deleted;
    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    private Date updateDate;


    public static FoundArticle of(FoundArticleDetailResponse detailResponse){
        return FoundArticle.builder()
                .name(detailResponse.getFdPrdtNm())
                .date(detailResponse.getFdYmd())
                .safeLocation(detailResponse.getDepPlace())
                .foundLocation(detailResponse.getFdPlace())
                .picture(detailResponse.getFdFilePathImg())
                .category(detailResponse.getPrdtClNm())
                .atcId(detailResponse.getAtcId())
                .description(detailResponse.getUniq())
                .build();
    }
}
