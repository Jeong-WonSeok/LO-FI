package com.ssafy.lofi.db.repository;

import com.ssafy.lofi.db.entity.Police;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PoliceRepository extends JpaRepository<Police,Long> {
}
