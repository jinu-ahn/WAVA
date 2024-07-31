package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
}
