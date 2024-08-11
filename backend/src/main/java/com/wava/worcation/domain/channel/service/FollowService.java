package com.wava.worcation.domain.channel.service;

import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface FollowService {
    Map<String, Object> follow(Long channelId, Long userId);

    FollowInfoDto getFollowers(String usernickname);

    FollowInfoDto getFollowings(String usernickname);
}
