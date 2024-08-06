package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.Feed;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedReository extends JpaRepository<Feed, Long> {
    Page<Feed> findAll(Pageable pageable);
}
