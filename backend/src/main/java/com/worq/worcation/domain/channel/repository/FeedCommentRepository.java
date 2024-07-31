package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.FeedComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedCommentRepository extends JpaRepository<FeedComment, Long> {

}
