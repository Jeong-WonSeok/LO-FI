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
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class LostArticle extends BaseEntity{
    @Nullable
    private Long userId;
    private String atcId;
    private String name;
    private String category;
    @Temporal(TemporalType.DATE)
    private Date date;
    private String police;
    private String location;
    private String city;
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
    private Time time;

    public static LostArticle of(LostArticleDetailResponse detailResponse) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return LostArticle.builder()
                .atcId(detailResponse.getAtcId())
                .name(detailResponse.getLstPrdtNm())
                .category(detailResponse.getPrdtClNm())
                .date(formatter.parse(detailResponse.getLstYmd()))
                .police(detailResponse.getOrgNm())
                .location(detailResponse.getLstPlace())
                .city(detailResponse.getLstLctNm())
                .picture(detailResponse.getLstFilePathImg())
                .description(detailResponse.getUniq())
                .build();
    }
}
