package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.FeedComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedCommentRepository extends JpaRepository<FeedComment, Long> {
    List<FeedComment> findByFeedId(Long feedId);
}
