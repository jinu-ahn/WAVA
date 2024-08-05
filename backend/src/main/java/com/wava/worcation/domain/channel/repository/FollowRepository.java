package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Channel;
import com.worq.worcation.domain.channel.domain.Follow;
import com.worq.worcation.domain.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    List<Follow> findByChannel(Channel channel);
    List<Follow> findByUser(User user);
    Boolean existsByChannelAndUser(Channel channel, User user);
}
