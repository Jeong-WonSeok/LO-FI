package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.MissingPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MissingPersonRepository extends JpaRepository<MissingPerson, Integer> {
}
