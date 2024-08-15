package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.MapPin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MapPinRepository extends JpaRepository<MapPin, Long> {
    Optional<MapPin> findById(String pinId);
    void deleteById(String pinId);
    List<MapPin> findByChannelId(Long channelId);
}
