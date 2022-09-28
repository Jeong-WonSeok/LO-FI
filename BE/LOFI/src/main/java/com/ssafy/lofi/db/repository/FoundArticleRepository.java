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
}
