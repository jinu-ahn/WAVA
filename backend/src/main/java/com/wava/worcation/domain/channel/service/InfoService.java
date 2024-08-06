package com.wava.worcation.domain.channel.service;

import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.user.domain.User;

import java.util.List;
import java.util.Map;


public interface InfoService {

    void CreateFeed(String content, String sido, String sigungu, List<String> imgUrls, User user);
    Map<String, Object> createComment(Long userId, Long feedId, String commentContext);
    FeedResponseDto viewFeed(Long feedid, User user);
    void likeAdd(Long feedId, User user);
    void likeDistract(Long feedId, User user);

    int feedCount(Long userId);
}
