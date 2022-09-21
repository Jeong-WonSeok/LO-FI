package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.Column;
import javax.persistence.Entity;
import java.beans.Encoder;
import java.util.Base64;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissingPerson extends BaseEntity{
    @Nullable
    private Integer userId;
    private String name;
    private String gender;
    private Integer age;
    private Integer ageNow;
    private String location;
    private String date;
    @Column(length = 2000)
    private String description;
    private String category;
    private String dress;
    @Column(columnDefinition = "TEXT")
    private String picture;

    public static MissingPerson of(MissingPersonAPIResponse missingPersonAPIResponse){
        return MissingPerson.builder()
                .name(missingPersonAPIResponse.getNm())
                .gender(missingPersonAPIResponse.getSexdstnDscd())
                .age(missingPersonAPIResponse.getAge())
                .ageNow(missingPersonAPIResponse.getAgeNow())
                .location(missingPersonAPIResponse.getOccrAdres())
                .date(missingPersonAPIResponse.getOccrde())
                .description(missingPersonAPIResponse.getEtcSpfeatr())
                .category(missingPersonAPIResponse.getWritngTrgetDscd())
                .dress(missingPersonAPIResponse.getAlldressingDscd())
                .picture(missingPersonAPIResponse.getTknphotoFile())
                .build();
    }
}
