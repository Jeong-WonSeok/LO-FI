package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.FoundArticle;
import com.ssafy.lofi.db.entity.Keyword;
import com.ssafy.lofi.db.entity.LostArticle;
import com.ssafy.lofi.db.entity.MissingAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword,Long> {

    @Query(nativeQuery = true, value = "select a.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.animal_id = k2.animal_id " + "join missing_animal as a on k2.animal_id = a.id")
    List<MissingAnimal> findBykeywordtwoAnimal(String k1,String k2);

    @Query(nativeQuery = true, value = "select a.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.found_id = k3.found_id " + "join found_article as f on k2.found_id = f.id")
    List<MissingAnimal> findBykeywordthreeAnimal(String k1,String k2,String k3);

    @Query(nativeQuery = true, value = "select a.* FROM (select * from keyword as k wehre k.keyword like :k1) as k1 join " +
            "missing_animal as a on k1.animal_id = a.id")
    List<MissingAnimal> findBykeywordoneAnimal(String k1);
    @Query(nativeQuery = true, value = "select f.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "join found_article as f on k2.found_id = f.id")
    List<FoundArticle> findBykeywordtwoFound(String k1,String k2);
    @Query(nativeQuery = true, value = "select f.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.found_id = k2.found_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.found_id = k3.found_id " + "join found_article as f on k2.found_id = f.id")
    List<FoundArticle> findBykeywordthreeFound(String k1,String k2,String k3);
    @Query(nativeQuery = true, value = "select f.* FROM (select * from keyword as k wehre k.keyword like :k1) as k1 join " +
            "found_article as f on k1.found_id = f.id")
    List<FoundArticle> findBykeywordoneFound(String k1);
    @Query(nativeQuery = true, value = "select l.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.lost_id = k2.lost_id " + "join lost_article as l on k2.lost_id = l.id")
    List<LostArticle> findBykeywordtwoArticle(String k1,String k2);
    @Query(nativeQuery = true, value = "select l.* FROM (select * from keyword as k where k.keyword like :k1) as k1 join " +
            "(select * from keyword as k where k.keyword like :k2) as k2 " + " on k1.lost_id = k2.lost_id " + "(select * from keyword as k where k.keyword like :k3) as k3 " +
            "on k2.lost_id = k3.lost_id " + "join lost_article as l on k2.lost_id = l.id")
    List<LostArticle> findBykeywordthreeArticle(String k1,String k2,String k3);
    @Query(nativeQuery = true, value = "select a.* FROM (select * from keyword as k wehre k.keyword like :k1) as k1 join " +
            "lost_article as l on k1.lost_id = a.id")
    List<LostArticle> findBykeywordoneArticle(String k1);
}
