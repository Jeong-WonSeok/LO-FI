package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.MissingAnimalAPIResponse;
import com.ssafy.lofi.dto.response.MissingPersonAPIResponse;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MissingAnimal extends BaseEntity{

//"id", "find", "gender", "age", "name", "missingDay", "location", "description", "img"

    private Long animalId;
    private String find;
    private String gender;
    private String age; // ~ 살 ~ 살 미만
    private String name;
    @Temporal(TemporalType.DATE)
    private Date missingDay;
    private String location;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String img;
    private Boolean used;
    @Temporal(TemporalType.DATE)
    private Date updateDay;
//    private String picture;

    public static MissingAnimal of(MissingAnimalAPIResponse missingAnimalAPIResponse){
        return MissingAnimal.builder()
                .name(missingAnimalAPIResponse.getResName())
                .gender(missingAnimalAPIResponse.getResGender())
                .age(missingAnimalAPIResponse.getResAge())
                .location(missingAnimalAPIResponse.getResLocation())
                .missingDay(missingAnimalAPIResponse.getResMissingDay())
                .description(missingAnimalAPIResponse.getResDescription())
                .img(missingAnimalAPIResponse.getResImg())
                .used(missingAnimalAPIResponse.getResUsed())
                .build();
    }
}
