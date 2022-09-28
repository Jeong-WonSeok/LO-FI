package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.request.MissingPersonRequest;
import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import lombok.*;
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
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissingPerson extends BaseEntity {
    @Nullable
    private Long userId;
    private String name;
    private String gender;
    private Integer age;
    private Integer ageNow;
    private String location;
    @Temporal(TemporalType.DATE)
    private Date date;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String category;
    private String dress;
    @Column(columnDefinition = "TEXT")
    private String picture;
    private Double latitude;
    private Double longitude;

    public static MissingPerson of(MissingPersonAPIResponse missingPersonAPIResponse) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        return MissingPerson.builder()
                .name(missingPersonAPIResponse.getNm())
                .gender(missingPersonAPIResponse.getSexdstnDscd())
                .age(missingPersonAPIResponse.getAge())
                .ageNow(missingPersonAPIResponse.getAgeNow())
                .location(missingPersonAPIResponse.getOccrAdres())
                .date(formatter.parse(missingPersonAPIResponse.getOccrde()))
                .description(missingPersonAPIResponse.getEtcSpfeatr())
                .category(missingPersonAPIResponse.getWritngTrgetDscd())
                .dress(missingPersonAPIResponse.getAlldressingDscd())
                .picture(missingPersonAPIResponse.getTknphotoFile())
                .build();
    }

//    public void updateMissingPerson(MissingPersonRequest missingPersonRequest) {
//        this.name = missingPersonRequest.getName();
//        this.gender = missingPersonRequest.getGender();
//        this.age = missingPersonRequest.getMissingAge();
//        this.date = missingPersonRequest.getMissingDate();
//        this.dress = missingPersonRequest.getMissingClothes();
//        this.picture = missingPersonRequest.getPicture();
//    }
}
