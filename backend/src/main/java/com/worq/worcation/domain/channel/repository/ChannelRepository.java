package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChannelRepository extends JpaRepository<Channel, Long> {
}
