package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FeedRepository extends JpaRepository<Feed, Long> {
    Page<Feed> findAll(Pageable pageable);

    Page<Feed> findByContentContaining(String content, Pageable pageable);
    Page<Feed> findByChannel(Channel channel, Pageable pageable);
    int countByChannelId(Long channelId);
}
