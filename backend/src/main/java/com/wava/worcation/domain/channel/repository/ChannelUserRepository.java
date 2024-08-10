package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.ChannelUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelUserRepository extends JpaRepository<ChannelUser, Long> {
    List<ChannelUser> findByChannelId(Long channelId);
    int countByChannelId(@Param("channel_id") Long channel_id);
    List<ChannelUser> findByUserId(Long userId);
    boolean existsChannelUserByChannelIdAndUserId(Long channelId, Long userId);
}
