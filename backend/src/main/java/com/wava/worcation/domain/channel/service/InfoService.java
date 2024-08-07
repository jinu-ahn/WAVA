package com.wava.worcation.domain.channel.service;

import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;


public interface InfoService {

    void CreateFeed(String content, String sido, String sigungu, List<String> imgUrls, User user);
    Map<String, Object> createComment(Long userId, Long feedId, String commentContext);
    FeedResponseDto viewFeed(Long feedid, User user);
    void likeAdd(Long feedId, User user);
    void likeDistract(Long feedId, User user);
    Page<FeedSortResponseDto> searchfeed(int pages, String nickname, String content, User user);

    int feedCount(Long userId);

}
