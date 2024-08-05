// src/main/java/com/worq/worcation/domain/worcation/dao/WorcationRepository.java
package com.worq.worcation.domain.worcation.dao;

import com.worq.worcation.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.worq.worcation.domain.worcation.domain.Worcation;

@Repository
public interface WorcationRepository extends JpaRepository<Worcation, Long> {
    Worcation findByUserId(Long userId);
}
