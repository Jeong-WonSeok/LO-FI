package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.MissingAnimal;
import com.ssafy.lofi.db.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MissingAnlmalRepository extends JpaRepository<MissingAnimal, Long> {
    @Modifying
    @Query(value = "truncate table missing_animal", nativeQuery = true)
    void truncateMissingPerson();

    @Query(nativeQuery = true, value = "select m.* from missing_animal as m " +
            "where (6371*acos(cos(radians(:lat))*cos(radians(m.latitude))*cos(radians(m.longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(m.latitude)))) <= 0.3")
    List<MissingAnimal> findAllByLatLon(double lat, double lon);
}
