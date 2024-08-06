package com.wava.worcation.domain.channel.repository;

import com.wava.worcation.domain.channel.domain.FeedComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedCommentRepository extends JpaRepository<FeedComment, Long> {
    List<FeedComment> findAllByFeedId(Long feedId);
}
