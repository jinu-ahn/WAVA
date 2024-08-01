package com.worq.worcation.domain.channel.repository;

import com.worq.worcation.domain.channel.domain.Image;
import com.worq.worcation.domain.channel.domain.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeRepository extends JpaRepository<Like, Long>  {

}
