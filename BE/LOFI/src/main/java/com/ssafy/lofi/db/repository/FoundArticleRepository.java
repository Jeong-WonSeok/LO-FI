package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.FoundArticle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoundArticleRepository extends JpaRepository<FoundArticle, Long> {
    FoundArticle findByAtcId(String atcId);
}
