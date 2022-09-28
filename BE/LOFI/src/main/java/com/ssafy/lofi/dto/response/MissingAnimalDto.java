package com.ssafy.lofi.dto.response;

import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.entity.MissingPerson;
import lombok.Data;

@Data
public class MissingAnimalDto {

    private Long id;
    private Long animalId;
    private String find;
    private String name;
    private String gender;
    private String age;
    private String location;
    private String date;
    private String description;
    private String picture;
    // 위도 경도 좌표
    private String lat;
    private String lon;

    public MissingAnimalDto(MissingAnimal missingAnimal){
        this.id = missingAnimal.getId();
        this.name = missingAnimal.getName();
        this.gender = missingAnimal.getGender();
        this.age = missingAnimal.getAge();
        this.location = missingAnimal.getLocation();
        this.date = missingAnimal.getMissingDay().toString();
        this.description = missingAnimal.getDescription();
        //this.picture = missingAnimal.getPicture();
    }
}
