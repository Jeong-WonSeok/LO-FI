package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Long> {
    @Modifying
    @Query(value = "truncate table missing_person", nativeQuery = true)
    void truncateMissingPerson();

    @Query(nativeQuery = true, value = "select m.* from missing_person as m " +
            "where (6371*acos(cos(radians(:lat))*cos(radians(m.latitude))*cos(radians(m.longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(m.latitude)))) <= 1")
    List<MissingPerson> findAllByLatLon(double lat, double lon);

    List<MissingPerson> findAllByUserId(Long userId);
}
