package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.LostArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LostArticleRepository extends JpaRepository<LostArticle, Long> {
    LostArticle findByAtcId(String lostArticleId);
}
