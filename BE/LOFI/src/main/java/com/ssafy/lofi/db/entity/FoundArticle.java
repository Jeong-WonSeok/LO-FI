package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.FoundArticleDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class FoundArticle extends BaseEntity{

    private String atcId;
    private String name;
    private String category;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String safeLocation;
    private String foundLocation;
    @Nullable
    private Long userId;
    private String picture;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "boolean default true")
    private String deleted;
    @Temporal(TemporalType.DATE)
    @CreationTimestamp
    private Date updateDay;
    private Double latitude;
    private Double longitude;


    public static FoundArticle of(FoundArticleDetailResponse detailResponse) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return FoundArticle.builder()
                .name(detailResponse.getFdPrdtNm())
                .date(formatter.parse(detailResponse.getFdYmd()))
                .safeLocation(detailResponse.getDepPlace())
                .foundLocation(detailResponse.getFdPlace())
                .picture(detailResponse.getFdFilePathImg())
                .category(detailResponse.getPrdtClNm())
                .atcId(detailResponse.getAtcId())
                .description(detailResponse.getUniq())
                .build();
    }
}
