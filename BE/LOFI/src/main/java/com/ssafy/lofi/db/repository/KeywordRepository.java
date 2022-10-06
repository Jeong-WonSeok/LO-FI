package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.FoundArticle;
import com.ssafy.lofi.db.entity.Keyword;
import com.ssafy.lofi.db.entity.LostArticle;
import com.ssafy.lofi.db.entity.MissingAnimal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword,Long> {

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
    // 분실물
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
