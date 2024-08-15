package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Companion;
import org.hibernate.annotations.SQLDelete;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanionRepository extends JpaRepository<Companion, Long> {
    List<Companion> findByMapPinId(String pinId);
    void deleteAllByMapPinId(String pinId);
}
