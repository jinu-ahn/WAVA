package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Feed;
import com.worq.worcation.domain.channel.domain.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByFeed(Feed feed);
}
