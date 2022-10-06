package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.FoundArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoundArticleRepository extends JpaRepository<FoundArticle, Long> {
    FoundArticle findByAtcId(String atcId);

    @Modifying
    @Query(value = "UPDATE found_article f SET f.deleted = true where f.atc_id = :atcId", nativeQuery = true)
    void deleteFoundArticle(@Param("atcId") String atcId);

    @Query(value = "select f.atc_id from found_article as f", nativeQuery = true)
    List<String> findAllAtcId();

    @Query(nativeQuery = true, value = "select f.* from found_article as f " +
            "where (6371*acos(cos(radians(:lat))*cos(radians(f.latitude))*cos(radians(f.longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(f.latitude)))) <= 1 order by f.date DESC")
    List<FoundArticle> findAllByLatLon(double lat, double lon);

    List<FoundArticle> findAllByUserId(Long userId);

    // 습득물
    @Query(nativeQuery = true, value = "select distinct f.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "join found_article as f on k2.found_id = f.id order by f.date DESC limit 100")
    List<FoundArticle> findBykeywordtwoFound(String k1,String k2);
    @Query(nativeQuery = true, value = "select distinct f.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.found_id = k3.found_id " + "join found_article as f on k2.found_id = f.id order by f.date DESC limit 100")
    List<FoundArticle> findBykeywordthreeFound(String k1,String k2,String k3);
    @Query(nativeQuery = true, value = "select distinct f.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "found_article as f on k1.found_id = f.id order by f.date DESC limit 100")
    List<FoundArticle> findBykeywordoneFound(String k1);
}
