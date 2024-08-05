package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Channel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChannelRepository extends JpaRepository<Channel, Long> {
    Optional<Channel> findById(Long id);
    @Query("select c from Channel c where c.user.id = :userId")
    Channel findChannelByUserId (long userId);
    List<Object> findByUserId(long userId);
    List<Long> findAllById(Long userId);
}
