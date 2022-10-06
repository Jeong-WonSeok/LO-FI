package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.LostArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface LostArticleRepository extends JpaRepository<LostArticle, Long> {
    LostArticle findByAtcId(String lostArticleId);
    @Modifying
    @Query(value = "UPDATE lost_article l SET l.deleted = true where l.atc_id = :atcId", nativeQuery = true)
    void deleteLostArticle(@Param("atcId") String atcId);

    @Query(value = "select l.atc_id from lost_article as l", nativeQuery = true)
    List<String> findAllAtcId();


    @Query(nativeQuery = true, value = "select l.* from lost_article as l " +
            "where (6371*acos(cos(radians(:lat))*cos(radians(l.latitude))*cos(radians(l.longitude)-radians(:lon))+sin(radians(:lat))*sin(radians(l.latitude)))) <= 1 order by l.date DESC")
    List<LostArticle> findAllByLatLon(double lat, double lon);

    List<LostArticle> findAllByUserId(Long userId);

    @Query(nativeQuery = true, value = "select distinct l.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.lost_id = k2.lost_id " + "join lost_article as l on k2.lost_id = l.id order by l.date DESC limit 100")
    List<LostArticle> findBykeywordtwoArticle(String k1,String k2);
    @Query(nativeQuery = true, value = "select distinct l.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.lost_id = k2.lost_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.lost_id = k3.lost_id " + "join lost_article as l on k2.lost_id = l.id order by l.date DESC limit 100")
    List<LostArticle> findBykeywordthreeArticle(String k1,String k2,String k3);
    @Query(nativeQuery = true, value = "select distinct l.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "lost_article as l on k1.lost_id = l.id order by l.date DESC limit 100")
    List<LostArticle> findBykeywordoneArticle(String k1);
}
