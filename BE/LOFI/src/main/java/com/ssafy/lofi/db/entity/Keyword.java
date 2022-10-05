package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.response.KeywordAPIResponse;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Keyword extends BaseEntity{

    // "id", "keyword", "animal_id", "person_id", "found_id", "lost_id"

    private String keyword;
    private Long foundId;
    private Long lostId;
    private Long animalId;
    private Long personId;

}