package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Integer> {
    @Modifying
    @Query(value = "truncate table missing_person", nativeQuery = true)
    void truncateMissingPerson();
}
