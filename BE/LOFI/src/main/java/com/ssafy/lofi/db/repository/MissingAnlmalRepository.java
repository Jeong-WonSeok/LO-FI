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
            "where (6371*acos(cos(radians(:lat))*cos(radians(m.latitude))*cos(radians(m.longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(m.latitude)))) <= 1 order by m.missing_day DESC")
    List<MissingAnimal> findAllByLatLon(double lat, double lon);

    List<MissingAnimal> findAllByUserId(Long userId);

    // 실종동물
    @Query(nativeQuery = true, value = "select distinct a.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.animal_id = k2.animal_id " + "join missing_animal as a on k2.animal_id = a.id order by a.missing_day DESC limit 100")
    List<MissingAnimal> findBykeywordtwoAnimal(String k1,String k2);

    @Query(nativeQuery = true, value = "select distinct a.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.found_id = k3.found_id " + "join missing_animal as f on k2.found_id = a.id order by a.missing_day DESC limit 100")
    List<MissingAnimal> findBykeywordthreeAnimal(String k1,String k2,String k3);

    @Query(nativeQuery = true, value = "select distinct a.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "missing_animal as a on k1.animal_id = a.id order by a.missing_day DESC limit 100")
    List<MissingAnimal> findBykeywordoneAnimal(String k1);
}
