package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.dto.info.FeedRequestDto;
import com.worq.worcation.domain.channel.dto.info.FeedResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;


public interface InfoService {

    Void CreateFeed(FeedRequestDto requestDto, List<String> imgUrls);
    Map<String, Object> createComment(Long userid, Long feedid, String commentContext);
    FeedResponseDto viewFeed(Long feedid, Long userid);
    void likeAdd(Long feedId, Long userId);
    void likeDistract(Long feedId, Long userId);

    int feedCount(Long userId);
}
