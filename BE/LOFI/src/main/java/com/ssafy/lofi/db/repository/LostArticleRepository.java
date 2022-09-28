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


}
