package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.MapPin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MapPinRepository extends JpaRepository<MapPin, Long> {
    Boolean existsByPinOrderAndChannelId(Long pinOrder, Long channelId);
    void deleteById(Long pinId);
}
