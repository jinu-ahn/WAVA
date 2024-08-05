package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.dto.info.FeedResponseDto;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Map;


public interface InfoService {

    Void CreateFeed(String content, String sido, String sigungu, List<String> imgUrls, UserDetails userDetails);
    Map<String, Object> createComment(Long userid, Long feedid, String commentContext);
    FeedResponseDto viewFeed(Long feedid, Long userid);
    void likeAdd(Long feedId, Long userId);
    void likeDistract(Long feedId, Long userId);

    int feedCount(Long userId);
}
