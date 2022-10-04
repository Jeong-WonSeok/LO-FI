package com.ssafy.lofi.dto.response;

import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.entity.MissingPerson;
import lombok.Data;

@Data
public class MissingAnimalDto {

    private Long id;
    private Long animalId;
    private Long userId;
    private String email;
    private String breed;
    private String name;
    private String gender;
    private String age;
    private String location;
    private String date;
    private String description;
    private String picture;
    private String time;
    // 위도 경도 좌표
    private double lat;
    private double lon;

    public MissingAnimalDto(MissingAnimal missingAnimal){
        this.id = missingAnimal.getId();
        this.name = missingAnimal.getName();
        this.breed = missingAnimal.getKind();
        this.gender = missingAnimal.getGender();
        this.age = missingAnimal.getAge();
        this.location = missingAnimal.getLocation();
        this.date = missingAnimal.getMissingDay().toString();
        this.description = missingAnimal.getDescription();
        this.picture = missingAnimal.getImg();
        this.lat = missingAnimal.getLatitude();
        this.lon = missingAnimal.getLongitude();
        this.time = missingAnimal.getTime() == null ? "00:00:00" : missingAnimal.getTime().toString();
    }
}
