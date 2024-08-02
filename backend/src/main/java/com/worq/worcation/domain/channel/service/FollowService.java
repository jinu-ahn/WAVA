package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.dto.info.FollowInfoDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface FollowService {
    Map<String, Object> follow(Long channelId, Long userId);

    List<FollowInfoDto.UserFollowInfoDto> getFollowers(Long channelId);

    List<FollowInfoDto.UserFollowInfoDto> getFollowings(Long channelId);
}
