package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.ChannelUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChannelUserRepository extends JpaRepository<ChannelUser, Long> {
    List<ChannelUser> findByChannelId(Long channelId);
    @Query(value = "select count(*) from channel_user group by channel_id = :channel_id",nativeQuery = true)
    int countChannelId(@Param("channel_id") Long channel_id);
}
