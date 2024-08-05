package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Feed;
import com.worq.worcation.domain.channel.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>  {
    Optional<Like>  findByUserIdAndFeed(Long userId, Feed feed);
}
