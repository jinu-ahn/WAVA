// src/main/java/com/worq/worcation/domain/worcation/dao/WorcationRepository.java
package com.wava.worcation.domain.worcation.dao;

import com.wava.worcation.domain.worcation.domain.Worcation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorcationRepository extends JpaRepository<Worcation, Long> {
    Worcation findByUserId(Long userId);
    boolean existsByUserId(Long userId);
}
