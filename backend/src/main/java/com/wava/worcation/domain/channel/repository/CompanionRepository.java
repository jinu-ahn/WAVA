package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Companion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
    List<Companion> findByMapPinId(Long pinId);
}
