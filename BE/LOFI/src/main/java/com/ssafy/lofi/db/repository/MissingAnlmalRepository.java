package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface MissingAnlmalRepository extends JpaRepository<MissingAnimal, Long> {
    @Modifying
    @Query(value = "truncate table missing_animal", nativeQuery = true)
    void truncateMissingPerson();
}
