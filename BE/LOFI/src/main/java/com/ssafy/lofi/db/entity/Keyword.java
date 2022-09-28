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

    // "id", "keyword", "animal_index_id", "person_index_id", "found_index_id", "lost_index_id"

    private String keyword;
    @ManyToOne
    @JoinColumn(name="foundId")
    private FoundArticle found_index_id;
    @ManyToOne
    @JoinColumn(name="lostId")
    private LostArticle lost_index_id;
    @ManyToOne
    @JoinColumn(name="animalId")
    private MissingAnimal animal_index_id;
    @ManyToOne
    @JoinColumn(name="personId")
    private MissingPerson person_index_id;

}