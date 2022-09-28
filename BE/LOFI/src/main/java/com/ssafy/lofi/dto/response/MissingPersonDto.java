package com.ssafy.lofi.dto.response;

import com.ssafy.lofi.db.entity.MissingPerson;
import lombok.Data;

@Data
public class MissingPersonDto {
    private Long id;
    private String name;
    private String gender;
    private Integer age;
    private Integer ageNow;
    private String location;
    private String date;
    private String description;
    private String category;
    private String dress;
    private String picture;
    // 위도 경도 좌표
    private String lat;
    private String lon;

    public MissingPersonDto(MissingPerson missingPerson){
        this.id = missingPerson.getId();
        this.name = missingPerson.getName();
        this.gender = missingPerson.getGender();
        this.age = missingPerson.getAge();
        this.ageNow = missingPerson.getAgeNow();
        this.location = missingPerson.getLocation();
        this.date = missingPerson.getDate();
        this.description = missingPerson.getDescription();
        this.category = missingPerson.getCategory();
        this.dress = missingPerson.getDress();
        this.picture = missingPerson.getPicture();
    }
}